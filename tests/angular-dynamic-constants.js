define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/order!angular/angular',
    'intern/order!angular-mocks/angular-mocks',
    'intern/order!angular-dynamic-constants'
], function (expect, bdd) {

    bdd.describe('Angular Dynamic Constants', function(){


        bdd.describe("Cache", function() {
            bdd.it("should be an empty object", function(){
                expect(Ngdc.cache).to.be.empty;
            });
        });

        bdd.describe("hasVariable", function(){
            bdd.it("should return true/false if a variable is present", function(){

                expect(Ngdc.hasVariable("{server.url}")).to.be.true;

                expect(Ngdc.hasVariable("{fail")).to.be.false;

            });
        });


        bdd.describe("set", function() {

            bdd.it("should save key/values in cache", function(){

                var server = {
                    app: "Angular Dynamic Constants",
                    server: {
                        url: "http://my.site"
                    },
                    endpoints: {
                        version: "v1",
                        api: "{server.url}/api/{version}"
                    },
                    urls: {list: ["http://ser.ver/api", "{endpoints.api}"]},
                    level1: {
                        level2: {
                            level3: {
                                level4: "{app}"
                            }

                        }
                    },

                    objTest: [
                        {a: "b"}
                    ],
                    objTestResult: "{objTest}"


                };

                Ngdc.set(Ngdc.set(server));

                expect(Ngdc.cache).to.eql(server);

            });


            bdd.it("it should merge properties with the same key", function(){
                Ngdc.set({server: {name: "site"}});
                expect(Ngdc.cache.server).to.eql({url: "http://my.site", name: "site"});
            });


        });

        bdd.describe("update", function(){
            bdd.it("should replace variables", function(){

                Ngdc.update();
                var api = Ngdc.cache.endpoints.api;

                expect(api).to.eql("http://my.site/api/v1");
            });


            bdd.it("should replace variables in arrays", function(){
                expect(Ngdc.cache.urls.list[1]).to.eql("http://my.site/api/v1");
            });


            bdd.it("should replace variables in nested arrays", function(){

                expect(Ngdc.cache.level1.level2.level3.level4).to.eql("Angular Dynamic Constants");
            });

            bdd.it("should replace variables with objects or arrays", function(){
               expect(Ngdc.cache.objTest).to.eql([{a:"b"}]);
            });

        });

        bdd.describe("replaceVariables", function(){
            bdd.it("should replace variables", function(){

                var result = Ngdc.replaceVariables("{server.url}/api/{version}", Ngdc.cache.endpoints);

                expect(result).to.equal("http://my.site/api/v1");

            });
        });

        bdd.describe("get()", function(){

            bdd.it("should get values from cache", function(){
                expect(Ngdc.get("server.name")).to.equal("site");
            });

        });






    });


});