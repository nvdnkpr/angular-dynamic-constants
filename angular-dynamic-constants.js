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

                //@todo: add logic for more nested levels.
                for (var j in item) {

                    if (angular.isArray(item[j])) {

                        for (var x in item[j]) {
                            item[j][x] = this.update(item, item[j][x]);
                        }

                    } else {
                        item[j] = this.update(item, item[j]);
                    }
                }
            }

            app.constant(setup.constant, this.cache);
        },

        //@todo: This method needs to be private
        update: function(self, item) {

            var $this = this;

            item.replace(/\{([A-Za-z0-9_.]+)\}/g, function (m, p1) {
                if (p1.indexOf(".") >= 0) { //@todo: update to regular expression word.word
                    var parts = p1.split(".");

                    if ($this.cache[parts[0]][parts[1]]) {
                        return $this.cache[parts[0]][parts[1]];
                    }

                    console.warn("%s cannot be found", p1);
                } else {
                    if (self[p1]) {
                        return self[p1];
                    } else if ($this.cache[p1]) {
                        return $this.cache[p1];
                    }

                    console.warn("%s cannot be found", p1);
                }

            });
        }
    };

}).call(this, window, document, undefined);

