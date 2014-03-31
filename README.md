angular-dynamic-constants
=========================

Angular Dynamic Constants allows you to set configuration parameters where one depends on another.
Allowing you to use small configuration files so that you can keep your code organized.

###  How to use it ###

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

### And you will have something like this: ###
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


### How to use it in an Angular controller. ###

```js
app.controller('Ctrl', ['Config', function(Config){

    var apiURL = Config.endpoints.api;
    // "http://my.site/api/v1"

    var urls = Conf.server.apis
    // ["http://ser.ver/api", "http://my.site/api/v1"]

}]);
```
### Using Angular Dynamic Constants ###

Is available through [bower](http://bower.io/):

```bash
# using bower
bower install angular-dynamic-constants
```


### Why I created this ###
Suppose that you'd like to have set of configuration files with parameters where one depends on another, but we don’t want to repeat this value again and again.
The more flexible you want you application to be, the larger the configuration files, the more that you have to repeat yourself. I created Angular Dynamic Constants
to provide a solution for this problem.




