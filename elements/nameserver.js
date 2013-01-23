/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var redis = require("redis")
  , ascoltatori = require('ascoltatori')
  , settings = require('../settings.js');

var client = redis.createClient(settings.distribution.settings.port, 
                            settings.distribution.settings.host, 
                            {no_ready_check: true});

client.auth(settings.distribution.settings.auth, function redisConnection(){
  console.log('connected to redis');
});

var ascoltatore = new ascoltatori.RedisAscoltatore({
  redis: redis,
  client_conn : client,
  sub_conn: client
});

ascoltatore.publish('hello/42', 'a message', function publishRedis() {
  console.log('message published');
})