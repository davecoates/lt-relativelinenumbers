(ns lt.plugins.relativelinenumbers
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))


(object/object* ::preferences
                :show-current-line true
                :show-insert-mode true)

(def preferences (object/create ::preferences))


(def state (atom {:pos {:line 0 :ch 0}
                  :first-line-number 1
                  :current-formatter :relative}))


(defn line->relative-line
  "Convert absolute line number to number relative to current line."
  [l]
  (let [first-line (:first-line-number @state)
        cur (+ (-> @state :pos :line) first-line)]
    (if (and (= cur l) (:show-current-line @preferences))
      l
      (js/Math.abs (- cur l)))))


(defn set-formatter!
  "Set current formatter used (:relative or :default)"
 [k]
 (let [ed (pool/last-active)]
   (swap! state assoc :current-formatter k)
   (.refresh (editor/->cm-ed ed))))


(defn vim-mode-change
  "Set appropriate formatter when VIM mode changes. When :show-current-line
  preference is true will show absolute line numbers in insert mode."
  [p]
  (when (:show-insert-mode @preferences)
    (let [mode (.-mode p) ed (pool/last-active)]
      (if (= mode "insert")
        (set-formatter! :default)
        (set-formatter! :relative)))))


(defn line-formatter
  "Format a line based on current formatter"
  [line]
  (if (= (:current-formatter @state) :relative)
    (line->relative-line line)
    ((:default-formatter @state) line)))


(behavior ::activate
          :triggers #{:init}
          :desc "Relative Line Numbers: Activate"
          :type :user
          :reaction (fn [this]
                      (let [cm (editor/->cm-ed this)]
                        (swap! state assoc :first-line-number  (editor/option this "firstLineNumber"))
                        (swap! state assoc :default-formatter  (editor/option this "lineNumberFormatter"))
                        (editor/on this "vim-mode-change" vim-mode-change)
                        (editor/set-options this {"lineNumberFormatter" line-formatter}))))


(behavior ::relative-linenumber-settings
                  :desc "Editor: Relative line number settings"
                  :params [{:label "Show current line?"
                            :type :bool}
                           {:label "Show line numbers in insert mode"
                            :type :bool}]
                  :type :user
                  :exclusive true
                  :triggers #{:object.instant}
                  :reaction (fn [this show-current-line show-insert-mode]
                              (let [final {:show-current-line show-current-line}
                                    final (if (not (nil? show-insert-mode))
                                            (assoc final :show-insert-mode show-insert-mode)
                                            final)]
                                (object/merge! preferences final))))


(cmd/command {:command :relativelinenumbers.toggle
              :desc "Relative Line Numbers: Toggle"
              :exec (fn []
                      (let [ed (pool/last-active)
                            current-formatter (:current-formatter @state)]
                        (if (= current-formatter :relative)
                          (set-formatter! :default)
                          (set-formatter! :relative))))})


(behavior ::update-line-numbers
          :triggers #{:move :active}
          :reaction (fn [this]
                      (let [last-line (-> @state :pos :line)]
                        (swap! state assoc :pos (editor/->cursor this))
                        (when (not= last-line (-> @state :pos :line))
                          (.refresh (editor/->cm-ed this))))))
