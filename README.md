angular-dynamic-constants
=========================

In Angular you can use .constant() to store configuration settings need it across the application.
The more flexible you want you application to be, the larger the configuration files are.

Angular Dynamic Constants allows you to separate configuration files into small files and
use dynamic values so that they can be reused.

Basic usage
-------------

Configuration files syntax
```javascript
Ngdc.set({
    name: {
       key: "value"
    }
});
```

Initialisation
```javascript
var app = angular.module("app", []);

Ngdc.config({app: app, constant: "Config"});

```

Then you'll have access to the Config constant

```javascript
app.controller('Ctrl', ['Config', function(Config){

    var key = Config.name.key;
    // "value"

}]);

```





This is an example on how to create configuration files.

config/server.json.js
```javascript
Ngdc.set({
    server: {
        protocol: "http",
        host: "localhost",
        port: 8080
    }
});
```

config/endpoints.json.js

```javascript
Ngdc.set({
    endpoints: {
        api: "{server.protocol}://{server.host}:{server.port}/api"
    }
});
```

config/services.json.js
```javascript
Ngdc.set({
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