var adc = {
    cache: {},
    set: function(json) {
        var keys = Object.keys(json);
        this.cache[keys[0]] = json[keys[0]];
    }
};

var AngularDynamicConstants = function AngularDynamicConstants(setup) {

    var app = setup.app;

    var item;

    for (var i in adc.cache) {

        item = adc.cache[i];

        for (var j in item) {

            item[j] = item[j].replace(/\{([A-Za-z0-9_.]+)\}/g, function(m, p1) {

                if (p1.indexOf(".") >= 0) {
                    var parts = p1.split(".");
                    return adc.cache[parts[0]][parts[1]];
                } else {

                  return item[p1];

                }
            });
        }
    }

    app.constant(setup.constant, adc.cache);

};

