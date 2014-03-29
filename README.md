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
<script src="src/angular-dynamic-constants.js"></script>
<script src="config/server.json.js"></script>
<script src="config/endpoints.json.js"></script>
```

Initialisation
```javascript
// File: app.js
var app = angular.module("app", []);

Ngdc.config({app: app, constant: "Config"});

```

Then you'll have access to the Config constant

```javascript
app.controller('Ctrl', ['Config', function(Config){

    var apiURL = Config.endpoints.api;
    // "http://my.site/api/v1"

}]);

```




