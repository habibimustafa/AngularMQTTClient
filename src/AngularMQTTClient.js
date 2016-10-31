/**
 * Created by shellus on 2016-03-16.
 * Add connection options by Habibi Mustafa on 2016-10-31.
 */
angular.module('ngMQTTClient', [])
    .config(['$provide', function($provide){
        $provide.provider('MQTT', function(){

            var settings = {
                href: "",
                opts: {
                  auth: "",
                  clientId: ""
                }
            };

            this.setHref = function(href){
                settings.href = href;
            };
            this.setAuth = function(auth){
                settings.opts.auth = auth;
            };
            this.setClient = function(client){
                settings.opts.clientId = client;
            };
            this.setOptions = function(opts){
                settings.opts = {};
                settings.opts = opts;
            };
            this.$get = function() {
                return settings;
            };
        });
    }])

    .service('MQTTService',
        ['$q', '$rootScope', 'MQTT', function($q, $rootScope, MQTT) {
            var Service = {};
            var callbacks = {};

            if(MQTT.href)
              var client = mqtt.connect(MQTT.href, MQTT.opts); // connect with href
            else
              var client = mqtt.connect(MQTT.opts);

            client.on("message", function(topic, payload) {
                try {
                    var data = JSON.parse(payload.toString());
                }catch (e){
                    var data = payload.toString();
                }
                angular.forEach(callbacks,function(callback, name){
                    var regexpStr = name.replace(new RegExp('(#)|(\\*)'),function(str){
                        if(str=="#"){
                            return ".*?"
                        }else if(str=="*"){
                            return ".*?"
                        }
                    });
                    if(topic.match(regexpStr)){
                        $rootScope.$apply(function() {
                            callback(data);
                        });
                    }
                })
            });

            client.publish("time", (new Date()).getDate());

            Service.on = function(name, callback){
                callbacks[name] = callback;
                client.subscribe(name);
            };
            Service.send = function(name, data){
                client.publish(name, JSON.stringify(data));
            };
            return Service;
        }]);
