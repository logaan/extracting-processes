(ns extracting-processes.core
  (:require [clojure.string :as string]
            [promise_stream.pstream :as ps]  
            [promise_stream.sources :as sources]
            [jayq.core :as jq]))

; Protocols
(defprotocol IHighlightable
  (-highlight!  [list n])
  (-unhighlight!  [list n]))

(defprotocol ISelectable
  (-select! [list n])
  (-unselect! [list n]))

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

; Rendering UI (Side effects)
(def ex0-ui
  [ "   Alan Kay"
   "   J.C.R. Licklider"
   "   John McCarthy" ])

(def ex1-ui
  ["   Smalltalk"
   "   Lisp"
   "   Prolog"
   "   ML"])

(defn set-output! [names]
  (let [output (jq/$ "#output")]
    (jq/text output (string/join "\n" names))))

; Utility
(defn on-keydown [target f]
  (aset target "onkeydown" f))

(defn log-stream [stream]
  (ps/mapd* (fn [v] (js/console.log (clj->js v)) v) stream))

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

(defn selected [sel-w-hl]
  (ps/reductions*
    sel-w-hl
    (ps/fmap
      (fn [{:keys [highlight selection] :as mem} event]
        (if (= event :select/current)
          (assoc mem :selection highlight)
          (assoc mem :highlight event))))
    (ps/promise {:highlight 0 :selection nil})))

(defn render-ui [ui {:keys [highlight selection]}]
  (-> ui
      (-select! selection)
      (-highlight! highlight)))

; Pure stream processing
(defn selection [ui keydowns]
  (let [keycodes    (ps/mapd*    #(aget % "which") keydowns) 
        keys        (ps/mapd*   keycode->key keycodes)
        known-keys  (ps/filter* (comp ps/promise identity) keys)
        actions     (ps/mapd*   key->action known-keys)

        highlights  (ps/filter*     (comp ps/promise highlight-actions) actions)
        hl-offsets  (ps/mapd*       highlight-action->offset highlights)
        highlighted (ps/reductions* hl-offsets (ps/fmap +) (ps/promise 0))
        wrapped-hl  (ps/mapd*       #(mod % (count ui)) highlighted)

        selects     (ps/filter* (comp ps/promise select-actions) actions)
        sel-w-hl    (ps/concat* selects wrapped-hl)
        s-n-hl-mem  (selected sel-w-hl)

        ui          (ps/mapd* (partial render-ui ui) s-n-hl-mem)]
    ui))

; Bootstrap
(->>
  (sources/callback->promise-stream on-keydown js/document)
  (selection ex1-ui)
  (ps/mapd* set-output!))

(jq/$ (fn []
        (set-output! (-highlight! ex1-ui 0))))
