//(function(appName){

    var app = angular.module('app', []);

    Ngdc.config({
        app: app,
        constant: "Config"
    });


    app.controller('Ctrl', ['$scope', 'Config', function($scope, Config){

        $scope.config = Config;

    }]);


//}).call(this, "app");
