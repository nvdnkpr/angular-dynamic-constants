angular-dynamic-constants
=========================

Angular configuration files can get large and applying DRY can be tedious.

In this project I provide a solution to separate configuration files into small files
and generate dynamic constants from these files so that they can share values.


This is an example on how to create configuration files.

config/server.json.js
```javascript
adc.set({
    server: {
        protocol: "http",
        host: "localhost",
        port: 8080
    }
});
```

config/endpoints.json.js

```javascript
adc.set({
    endpoints: {
        api: "{server.protocol}://{server.host}:{server.port}/api"
    }
});
```

config/services.json.js
```javascript
adc.set({
    services: {
        version: 1,
        contacts: "{endpoints.api}/v{version}/contacts"
    }
});
```

HTML
----
```html
<script src="src/angular-dynamic-constants.js"></script>
<script src="config/server.json.js"></script>
<script src="config/endpoints.json.js"></script>
<script src="config/services.json.js"></script>
```

ANGULAR
-------
```javascript
var app = angular.module("app", []);

var c = new AngularDynamicConstants({
    app: app,
    constant: "Config"
});
```


From Example

```javascript
app.controller('Ctrl', ['$scope', 'Config', function($scope, Config){

    $scope.config = Config.services.contacts

}]);


$scope.config it will be:

{
    api: "http://localhost:8080/api/v1/contacts"
}

```