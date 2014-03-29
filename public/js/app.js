//(function(appName){

    var app = angular.module('app', []);

    var ngDynC = new AngularDynamicConstants({
        app: app,
        constant: "Config"
    });


    app.controller('Ctrl', ['$scope', 'Config', function($scope, Config){

        $scope.config = Config;

    }]);


//}).call(this, "app");
