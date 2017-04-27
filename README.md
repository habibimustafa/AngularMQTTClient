# Angular MQTT Client

This project is based on https://github.com/mqttjs/MQTT.js#browser

This project can implement API Key from IBM Bluemix IoT Platform

## USAGE

```bash
bower install git@github.com:habibimustafa/AngularMQTTClient.git
```


```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/AngularMQTTClient/src/browserMqtt.js"></script>
<script src="bower_components/AngularMQTTClient/src/AngularMQTTClient.js"></script>

```


```javascript
    var app = angular.module('app', [
        'ngMQTTClient'
    ]);
    
    // use this
    app.config(['MQTTProvider', function(MQTTProvider){
        var host  = "ws://OrgId.messaging.internetofthings.ibmcloud.com";
        var port  = "1883";
        var user  = "Your API Key";
        var pass  = "Your API Secret";

        MQTTProvider.setHref(host+":"+port);
        MQTTProvider.setAuth(user+":"+pass);
        MQTTProvider.setClient("a:OrgId:AppId");
    }]);
    
    // or this
    app.config(['MQTTProvider', function(MQTTProvider){
       var options = {
             host: "OrgId.messaging.internetofthings.ibmcloud.com",
             port: "1883",
             username: "Your API Key",
             password: "Your API Secret",
             clientId: "a:OrgId:AppId"
       };

       MQTTProvider.setOptions(options);
    }]);

    app.controller('indexCtrl', ['$scope', 'MQTTService', function ($scope, MQTTService) {
        
        // Publishing device events
        MQTTService.send('iot-2/type/device_type/id/device_id/evt/event_id/fmt/format_string','on');
        MQTTService.send('iot-2/type/device_type/id/device_id/evt/event_id/fmt/format_string','off');
        MQTTService.send(
            'iot-2/type/device_type/id/device_id/evt/event_id/fmt/format_string',
            '{"status":"on"}'
        );

        // Subscribing device events
        MQTTService.on('iot-2/type/device_type/id/device_id/evt/event_id/fmt/format_string', function(data){
            console.log(data)
        });
        
        // Publishing device commands
        MQTTService.send('iot-2/type/device_type/id/device_id/cmd/command_id/fmt/format_string','on');
        MQTTService.send('iot-2/type/device_type/id/device_id/cmd/command_id/fmt/format_string','off');
        MQTTService.send(
            'iot-2/type/device_type/id/device_id/cmd/command_id/fmt/format_string',
            '{"status":"on"}'
        );
        
        // Subscribing device commands
        MQTTService.on('iot-2/type/device_type/id/device_id/cmd/command_id/fmt/format_string', function(data){
            console.log(data)
        });
        
    }]);

```

### AUTH
- Create API Key from your IBM Bluemix IoT Platform Dashboard. 
See https://console.ng.bluemix.net/docs/services/IoT/platform_authorization.html#api-key
- Use this code for Non-Secured Connection
```javascript
    var host  = "ws://OrgId.messaging.internetofthings.ibmcloud.com";
    var port  = "1883";
    var user  = "Your API Key"; // example: a-orgId-a84ps90Ajs
    var pass  = "Your API Secret"; // example: MP$08VKz!8rXwnR-Q*
    var clientId = "a:OrgId:AppId"; // example: a:orgId:MyAndroidApp
```
- Use this code for Secured Connection
```javascript
    var host  = "wss://OrgId.messaging.internetofthings.ibmcloud.com";
    var port  = "8883";
    var user  = "Your API Key"; // ex: a-orgId-a84ps90Ajs
    var pass  = "Your API Secret"; // ex: MP$08VKz!8rXwnR-Q*
    var clientId = "a:OrgId:AppId"; // example: a:orgId:MyAndroidApp
```

---
MQTT server install mothod see: http://blog.csdn.net/qhdcsj/article/details/45042515

Bluemix IoT Platform API connections see: https://console.ng.bluemix.net/docs/services/IoT/applications/mqtt.html
