angular-dynamic-constants
=========================

Angular Dynamic Constants is a javascript helper that allows you to separate configuration files into small files. Using expressions allows you to have "constants within constants".

## How to use it

### Configuration files.
```js
// File: server.json.js
Ngdc.set({
    server: {
       url: "http://my.site/"
    },
    apis:["http://ser.ver/api", "{endpoints.api}"]
});

// File: endpoints.json.js
Ngdc.set({
    endpoints: {
       version: "v1",
       api: "{server.url}/api/{version}"
    }
});

```

### HTML

```html
<script src="bower_components/angular-dynamic-constants.min.js"></script>
<script src="config/server.json.js"></script>
<script src="config/endpoints.json.js"></script>
```

### Setup
```javascript
// File: app.js
var app = angular.module("app", []);

Ngdc.config({app: app, constant: "Config"});

```

### How to get configuration settings

```js
app.controller('Ctrl', ['Config', function(Config){

    var apiURL = Config.endpoints.api;
    // "http://my.site/api/v1"

    var urls = Conf.server.apis
    // ["http://ser.ver/api", "http://my.site/api/v1"]

}]);
```

## Why I created this
In Angular you can use .constant() to store configuration global settings. The more flexible you want you application to be, the larger the configuration files.
Larger configuration files are hard to maintain and you end up with a string concatenation mess.




