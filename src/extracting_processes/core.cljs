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

(defn set-highlight-column [list n val]
  (update-in list [n] #(string/replace % #"^." val)))

(defn set-select-column [list n val]
  (update-in list [n] #(string/replace % #"^.." (string/join " " val))))

(extend-type cljs.core.PersistentVector
  IHighlightable
  (-highlight! [list n]
    (set-highlight-column list n ">"))
  (-unhighlight! [list n]
    (set-highlight-column list n " "))
  
  ISelectable
  (-select! [list n] "so")
  (-unselect! [list n] "desu"))

; Rendering UI (Side effects)
(def ex0-ui
  [ "   Alan Kay"
   "   J.C.R. Licklider"
   "   John McCarthy" ])

(defn render-output! [names]
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
   :enter :select-current})

(def highlight-actions
  #{:highlight/previous :highlight/next})

(def highlight-action->offset
  {:highlight/previous -1
   :highlight/next     +1})

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

        ui          (ps/mapd* (partial -highlight! ui) wrapped-hl)]
    ui))

; Bootstrap
(->>
  (sources/callback->promise-stream on-keydown js/document)
  (selection ex0-ui)
  (ps/mapd* render-output!))

(jq/$ (fn []
        (render-output! (-highlight! ex0-ui 0))))
