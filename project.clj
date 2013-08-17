(defproject extracting-processes "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [promise-stream "0.1.0-SNAPSHOT"]]
  :plugins [[lein-cljsbuild "0.3.2"]] 
  :cljsbuild {
              :builds
              [{:source-paths ["src"],
                :id "dev",
                :compiler {:pretty-print true,
                           :output-dir "resources/public/js/bin-debug",
                           :output-to "resources/public/js/bin-debug/main.js",
                           :externs ["externs/jquery-1.9.js"]
                           :optimizations :simple
                           :source-map "resources/public/js/bin-debug/main.js.map"}}]})
