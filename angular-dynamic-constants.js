/**
 * @license Angular Dynamic Constants v1.0.0
 * (c) 2014 Yago Ferrer <yago.ferrer@gmail.com>
 * License: MIT
 */
(function(window, document, undefined) {
    'use strict';

    window.Ngdc = {
        cache: {}, //@todo: use HTML5 WebStorage
        set: function(json) {

            for (var i in json) {

                // If the key exists, extend the object.
                if (this.cache[i]) {
                    angular.extend(this.cache[i], json[i]);
                } else {
                    this.cache[i] = json[i];
                }
            }

        },
        config: function(setup) {

            var $this = this;

            var app = setup.app;

            var item;


            for (var i in this.cache) {
                item = this.cache[i];

                //@todo: move this to a method.
                //@todo: add logic for more nested levels.
                for (var j in item) {
                    item[j] = item[j].replace(/\{([A-Za-z0-9_.]+)\}/g, function(m, p1) {
                        if (p1.indexOf(".") >= 0) { //@todo: update to regular expression word.word
                            var parts = p1.split(".");
                            return $this.cache[parts[0]][parts[1]];
                        } else {
                            return item[p1];
                        }
                    });
                }
            }

            app.constant(setup.constant, this.cache);
        }
    };

}).call(this, window, document, undefined);

