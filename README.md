angular-dynamic-constants
=========================

Angular configuration files can be large and applying DRY can be tedious.

In this project I provide a solution to separate configuration files into small files
and generate dynamic constants from these files.


How to create your configuration files?

config/server.jsonp
```
adc.set({
    server: {
        protocol: "http"
        host: "localhost"
        port: 8080
    }
})
```

config/endpoints.jsonp

```
adc.set({
    endpoints: {
        api: "{server.protocol}://{server.host}:{server.port}/api"
    }
})
```

HTML
```
<script type="text/javascript" src="angular-dynamic-constants.js"></script>
<script type="text/javascript" src="config/server.jsonp"></script>
<script type="text/javascript" src="config/endpoints.jsonp"></script>
```

ANGULAR
```
var app = angular.module("app", ["angular-dynamic-constants"]);

....

constant("endpoints")


Will be:

{
    api: "http://localhost:8080/api"
}


```