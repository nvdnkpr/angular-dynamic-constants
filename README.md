angular-dynamic-constants
=========================

In Angular you can use .constant() to store configuration global settings. The more flexible you want you application to be, the larger the configuration files.


Angular Dynamic Constants allows you to separate configuration files into small files and using expressions allows you to use constants within constants.

Basic syntax
------------

Configuration files syntax
```javascript
// File: server.json.js
Ngdc.set({
    server: {
       url: "http://my.site/"
    }
});

// File endpoints.json.js
Ngdc.set({
    endpoints: {
       version: "v1",
       api: "{server.url}/api/{version}"
    }
});
```

HTML
----
```html
<script src="bower_components/angular-dynamic-constants.js"></script>
<script src="config/server.json.js"></script>
<script src="config/endpoints.json.js"></script>
```

Initialisation
```javascript
// File: app.js
var app = angular.module("app", []);

Ngdc.config({app: app, constant: "Config"});

```

Now you can access to the generated constant endpoints.api

```javascript
app.controller('Ctrl', ['Config', function(Config){

    var apiURL = Config.endpoints.api;
    // "http://my.site/api/v1"

}]);

```




