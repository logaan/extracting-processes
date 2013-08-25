(ns extracting-processes.core
  (:use [promise_stream.pstream :only [mapd* filter* concat* reductions*
                                       promise fmap]]
        [jayq.core :only [$ on text]])
  (:require [clojure.string :as string]
            [promise_stream.pstream :as ps]
            [promise_stream.sources :as sources]
            [jayq.core :as jq]))

(defn log [clj-value]
  (js/console.log (clj->js clj-value)))

(defn log-stream [stream]
  (mapd* log stream))

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
  (array "   Alan Kay"
         "   J.C.R. Licklider"
         "   John McCarthy" ))

(def ex1-ui
  (array "   Smalltalk"
         "   Lisp"
         "   Prolog"
         "   ML" ))

(def first-state
  {:highlight 0 :selection nil})

; Utility
(defn remember-selection
  "Stores current highlight as selection when select events occur. Otherwise
  updates remembered highlight."
  [{:keys [highlight selection] :as mem} event]
  (if (= event :select/current)
    (assoc mem :selection highlight)
    (assoc mem :highlight event)))

; Pure stream processing
(defn identify-key-actions [keydowns]
  (->> keydowns
       (mapd*   #(aget % "which"))
       (mapd*   keycode->key)
       (filter* (comp promise identity))
       (mapd*   key->action)))

(defn mouseover->highlight [mouseover]
  (.index (jq/$ (.-target mouseover))))

(defn render-pre-ui [state]
  (log state))

; Side effects
(defn load-example [element ui]
  (let [wrap-at                    (count ui)

        ; Raw events
        keydowns                   (sources/callback->promise-stream on element "keydown")
        mouseovers                 (sources/callback->promise-stream on ($ "li" element)  "mouseover")
        mouseouts                  (sources/callback->promise-stream on ($ element)  "mouseout")
        clicks                     (sources/callback->promise-stream on ($ "li" element)  "click")

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
        
        ; Render actions
        render-actions             (mapd* render-pre-ui ui-states)]
    ui-states))

(log-stream (load-example ($ "#ex0") ex0-ui))

(text ($ "#ex0") (string/join "\n" ex0-ui))

