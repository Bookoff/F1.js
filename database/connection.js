//http://phrogz.net/JS/classes/OOPinJS2.html

"use strict";

var redis = require("redis")
  , ascoltatori = require('ascoltatori')
  , settings = require('../settings.js');

var Connection = function () {
   this.distributionSettings = settings.distribution.settings;
};

Connection.prototype.newAscoltatore = function(location){

    if (location == 'redis'){
        return new ascoltatori.RedisAscoltatore({
            redis       : redis,
            db          : this.distributionSettings.db,
            port        : this.distributionSettings.port,
            host        : this.distributionSettings.host,
            password    : this.distributionSettings.password
        });
    }

    return new ascoltatori.MemoryAscoltatore();
};

Connection.prototype.newRedisClient = function(){
    if (this.client === undefined){
        this.client = redis.createClient(this.distributionSettings.port,
            this.distributionSettings.host,
            {no_ready_check: true});
        if (this.client.auth !== undefined){
            this.client.auth(this.distributionSettings.auth);
        }
    }
    return this.client;
}

module.exports = Connection;