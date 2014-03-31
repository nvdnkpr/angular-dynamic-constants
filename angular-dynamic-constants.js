/**
 * @license Angular Dynamic Constants v1.0.0
 * (c) 2014 Yago Ferrer <yago.ferrer@gmail.com>
 * License: MIT
 */
(function(window, document, angular, undefined) {
    'use strict';

    var id = "[angular dynamic constants]";

    window.Ngdc = {
        cache: {},
        set: function(json) {

            for (var i in json) {
                if (this.cache[i]) {
                    angular.extend(this.cache[i], json[i]); // If the key exists, merge data.
                } else {
                    this.cache[i] = json[i];
                }
            }
        },

        get: function(key)
        {

            if (key.indexOf(".") >= 0) {
                var parts = key.split(".");

                if (this.cache[parts[0]][parts[1]]) {
                    return this.cache[parts[0]][parts[1]];
                }

                console.warn("%s %s cannot be found", id, key);
            } else {

                if (this.cache[key]) {
                    return this.cache[key];
                }

                console.warn("%s %s cannot be found", id , key);
            }
        },

        config: function(setup) {

            this.update();

            return this.save(setup);

        },

        save: function(setup)
        {
            setup.app.constant(setup.constant, this.cache);
        },

        replaceVariables: function(item, properties)
        {
            var $this = this;

            if (angular.isArray(item) || angular.isObject(item)) {
                for (var i in item) {
                    item[i] = this.replaceVariables(item[i], properties);
                }

                return item;


            } else {

                if (angular.isString(item)) {


                    var objResult = false;


                    var result = item.replace(/\{([A-Za-z0-9_.]+)\}/g, function (m, variable) {

                        var result = $this.replace(variable, properties);

                        if (angular.isObject(result) || angular.isArray(result)) {
                            objResult = result;
                        }
                        return result;
                    });

                    return (objResult) ? objResult : result;

                } else {
                    return item;
                }
            }

        },

        update: function() {

            var properties, item, $this = this;

            for (var name in this.cache) {

                properties = this.cache[name];

                if (angular.isString(properties)) {

                    if (this.hasVariable(properties)) {
                        var result = this.replaceVariables(properties, this.cache);
                        this.cache[name] = result;
                    }

                } else  {

                    for (var value in properties) {
                        item = properties[value];

                        if ( (angular.isString(item)) && this.hasVariable(item)) {

                            this.cache[name][value] = this.replaceVariables(item, properties);

                        } else if (angular.isArray(item) || angular.isObject(item)) {

                            if (this.hasVariable(item)) {
                                item = this.replaceVariables(item, properties);
                            }

                        }
                    }
                }


            }

        },


        //@todo: convert this to angular promises
        hasVariable: function(item)
        {

            if (angular.isArray(item) || angular.isObject(item)) {

                for (var i in item) {
                    if (this.hasVariable(item[i]) === true) {
                        return true;
                    }
                }

            } else {

                if (angular.isString(item)) {
                    var find = "\{[A-Za-z0-9_.]+\}";

                    var re = new RegExp(find, 'g');

                    var result = item.match(re);

                    return (result !== null) ? true : false;
                }

                return false;


            }
        },

        replace: function(value, properties)
        {

            if (value.indexOf(".") >= 0) { //@todo: update to regular expression word.word

                var parts = value.split(".");

                if (this.cache[parts[0]][parts[1]]) {
                    return this.cache[parts[0]][parts[1]];
                }

                console.warn("%s %s cannot be found", id, value);
                return "{" + value + "}";
            } else {

                if (typeof properties !== "undefined" && properties[value]) {

                    return properties[value];
                } else if (this.cache[value]) {
                    return this.cache[value];
                }

                console.warn("%s %s cannot be found", id, value);
                return "{" + value + "}";
            }
        }

    };

}).call(this, window, document, angular, undefined);

