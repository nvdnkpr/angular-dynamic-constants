define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/order!angular/angular',
    'intern/order!angular-mocks/angular-mocks',
    'intern/order!/src/angular-dynamic-constants'
], function (expect, bdd) {

    bdd.describe('Angular Dynamic Constants', function(){

        bdd.it("should have an empty object cache", function(){
            expect(Ngdc.cache).to.be.empty;
        });

        bdd.it("should save key/values in cache", function(){

            var server = {
                server: {url: "http://my.site"},
                endpoints: {
                    version: "v1",
                    api: "{server.url}/api/{version}"
                },
                urls: {list: ["http://ser.ver/api", "{endpoints.api}"]}
            };

            Ngdc.set(Ngdc.set(server));

            expect(Ngdc.cache).to.eql(server);

        });

        bdd.it("should merge properties if set() has the same key", function(){
            Ngdc.set({server: {name: "site"}});
            expect(Ngdc.cache.server).to.eql({url: "http://my.site", name: "site"});
        });

        bdd.it("update() should replace variables", function(){

            Ngdc.update();
            var api = Ngdc.cache.endpoints.api;

            expect(api).to.eql("http://my.site/api/v1");
        });

        bdd.it("hasVariable({server.url}) should return true", function(){

            expect(Ngdc.hasVariable("{server.url}")).to.be.true;

            expect(Ngdc.hasVariable("{fail")).to.be.false;

        });

        bdd.it("it should replace variables in arrays", function(){

            expect(Ngdc.cache.urls.list[1]).to.eql("http://my.site/api/v1");

        });

        bdd.it("get() should get values from cache", function(){

            expect(Ngdc.get("server.name")).to.equal("site");

        });

    });


});