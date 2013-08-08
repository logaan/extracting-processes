(ns extracting-processes.core
  (:use [promise_stream.pstream :only [mapd* filter* concat* reductions*
                                       promise fmap]]
        [jayq.core :only [$ on text]])
  (:require [clojure.string :as string]
            [promise_stream.pstream :as ps]  
            [promise_stream.sources :as sources]
            [jayq.core :as jq]))

; Protocols
(defprotocol IHighlightable
  (-highlight! [list n])
  (-unhighlight! [list n]))

(defprotocol ISelectable
  (-select! [list n])
  (-unselect! [list n]))

; Highlighting and selecting for vec->indented str ui
(defn set-select-column [list n val]
  (if n
    (update-in list [n] #(string/replace % #"^.." (str " " val)))
    list))

(defn set-highlight-column [list n val]
  (update-in list [n] #(string/replace % #"^." val)))

(extend-type cljs.core.PersistentVector
  IHighlightable
  (-highlight! [list n]
    (set-highlight-column list n ">"))
  (-unhighlight! [list n]
    (set-highlight-column list n " "))
  
  ISelectable
  (-select! [list n]
    (set-select-column list n "*"))
  (-unselect! [list n]
    (set-select-column list n " ")))

; Pure data
(def keycode->key
  {38 :up
   40 :down
   74 :j
   75 :k
   13 :enter})

(def key->action
  {:up    :highlight/previous
   :down  :highlight/next
   :j     :highlight/next
   :k     :highlight/previous
   :enter :select/current})

(def highlight-actions
  #{:highlight/previous :highlight/next})

(def select-actions
  #{:select/current})

(def highlight-action->offset
  {:highlight/previous dec
   :highlight/next     inc})

(def ex0-ui
  ["   Alan Kay"
   "   J.C.R. Licklider"
   "   John McCarthy"])

(def ex1-ui
  ["   Smalltalk"
   "   Lisp"
   "   Prolog"
   "   ML"])

(def first-state
  {:highlight 0 :selection nil})


; Utility
(defn log-stream [stream]
  (mapd* (fn [v] (js/console.log (clj->js v)) v) stream))

(defn remember-selection
  "Stores current highlight as selection when select events occur. Otherwise
  updates remembered highlight."
  [{:keys [highlight selection] :as mem} event]
  (if (= event :select/current)
    (assoc mem :selection highlight)
    (assoc mem :highlight event)))

(defn render-ui [ui {:keys [highlight selection]}]
  (string/join "\n"
    (-> ui
      (-select! selection)
      (-highlight! highlight))))

; Pure stream processing
(defn identify-key-actions [keydowns]
  (->> keydowns
       (mapd*   #(aget % "which")) 
       (mapd*   keycode->key)
       (filter* (comp promise identity))
       (mapd*   key->action)))

(defn mouseover->highlight [mouseover]
  (.index (jq/$ (.-target mouseover))))

; Side effects
(defn load-example [ui]
  (let [wrap-at                    (count ui)
        
        ; Raw events
        keydowns                   (sources/callback->promise-stream on ($ "div") "keydown")
        mouseovers                 (sources/callback->promise-stream on ($ "li")  "mouseover")
        mouseouts                  (sources/callback->promise-stream on ($ "ul")  "mouseout")
        clicks                     (sources/callback->promise-stream on ($ "li")  "click")

        ; Identified events
        key-actions                (identify-key-actions keydowns)

        key-selects                (filter* (comp promise select-actions) key-actions)
        mouse-selects              (mapd* (constantly :select) clicks)
        selects                    (concat* key-selects mouse-selects)

        highlight-moves            (filter* (comp promise highlight-actions) key-actions)

        mouse-highlight-indexes    (mapd* mouseover->highlight mouseovers)

        clears                     (mapd* (constantly :clear) mouseouts) 

        ; Highlight modifyers
        highlight-index-offsets    (mapd* highlight-action->offset highlight-moves)
        highlight-index-resets     (mapd* constantly mouse-highlight-indexes)

        ; Highlight index
        highlight-modifyers        (concat* highlight-index-offsets highlight-index-resets)
        raw-highlight-indexes      (reductions* (fmap (fn [v f] (f v))) (promise 0) highlight-modifyers)
        wrapped-highlight-indexes  (mapd* #(mod % wrap-at) raw-highlight-indexes)

        ; Highlights and selects
        highlights-and-selects     (concat* wrapped-highlight-indexes selects)

        ; UI states
        ui-states                  (reductions* (fmap remember-selection) (promise first-state) highlights-and-selects)

        ; Rendered UIs
        uis                        (mapd* (partial render-ui ui) ui-states)]
    uis))

(mapd* #(text ($ "#ex0") %) (load-example ex0-ui))
(mapd* #(text ($ "#ex1") %) (load-example ex1-ui))
