var Ngdc = {
    cache: {},
    set: function(json) {
        var keys = Object.keys(json);
        this.cache[keys[0]] = json[keys[0]];
    },
    config: function(setup) {

        var $this = this;

        var app = setup.app;

        var item;

        for (var i in this.cache) {

            item = this.cache[i];

            for (var j in item) {

                item[j] = item[j].replace(/\{([A-Za-z0-9_.]+)\}/g, function(m, p1) {

                    if (p1.indexOf(".") >= 0) {
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

