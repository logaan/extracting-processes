(ns extracting-processes.core
  (:use [promise_stream.pstream :only [mapd* filter* concat* reductions*
                                       promise fmap]])
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
  {:highlight/previous -1
   :highlight/next     +1})

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

(defn on-keydown [target f]
  (jq/on target "keydown" f))

; Pure stream processing
(defn identify-actions [keydowns]
  (->> keydowns
       (mapd*   #(aget % "which")) 
       (mapd*   keycode->key)
       (filter* (comp promise identity))
       (mapd*   key->action)))

(defn track-highlight [wrap-at actions]
  (->> actions
       (filter*     (comp promise highlight-actions))
       (mapd*       highlight-action->offset)
       (reductions* (fmap +) (promise 0))
       (mapd*       #(mod % wrap-at))))

(defn track-ui-states [actions highlight-indexes]
  (->> (filter* (comp promise select-actions) actions)
       (concat* highlight-indexes)
       (reductions* (fmap remember-selection) (promise first-state))))

(defn selection [ui keydowns]
  (let [actions           (identify-actions keydowns)
        highlight-indexes (track-highlight (count ui) actions)
        ui-states         (track-ui-states actions highlight-indexes)]
    (mapd* (partial render-ui ui) ui-states)))

; Side effects
(defn load-example [ui first-state output]
  (->> (sources/callback->promise-stream on-keydown output)
       (selection ui)
       (mapd* (partial jq/text output)))

    (jq/text output (render-ui ui first-state)))

(jq/$ #(load-example ex0-ui first-state (jq/$ "#ex0")))
(jq/$ #(load-example ex1-ui first-state (jq/$ "#ex1")))

