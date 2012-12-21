//http://phrogz.net/JS/classes/OOPinJS2.html

"use strict";

var redis = require("redis")
  , ascoltatori = require('ascoltatori')
  , settings = require('../settings.json');

function Element(id){ 
	this.id = id;
	// if you want to support other type of connections, add here your preferred ones
	this.connection = createConnection();

	var createConnection = function(){
		var client = redis.createClient(settings.distribution.settings.port, 
                            settings.distribution.settings.host, 
                            {no_ready_check: true});

		client.auth(settings.distribution.settings.auth, function redisConnection(){
		  console.log('connected to redis');
		});

		return new ascoltatori.RedisAscoltatore({
		  redis: redis,
		  client_conn : client,
		  sub_conn: client
		});
	}

	var createRedisConnection = function(){

	}

} 
Element.prototype.getConnection = function(){ 
	return this.connection;
} 
Element.prototype.toString = function(){ 
	return this.id;
} 
