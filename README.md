angular-dynamic-constants
=========================

Angular Dynamic Constants allows you to set configuration parameters where one depends on another.
Allowing you to use small configuration files so that you can keep your code organized.

###  How to use it

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

// File: app.js
var app = angular.module("app", []);

Ngdc.config({app: app, constant: "Config"});
```

### And you will have something like this:
```js
// Config (Angular Constant)
{
    server: {
        url: "http://my.site/"
    },
    endpoints: {
       version: "v1",
       api: "http://my.site/api/v1"
    }
    apis: ["http://ser.ver/api", "http://my.site/api/v1"]
}

```


### How to use it in an Angular controller.

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




