//http://phrogz.net/JS/classes/OOPinJS2.html

"use strict";

var redis = require("redis"),
    ascoltatori = require('ascoltatori'),
    settings = require('../settings.js');

var Connection = function () {
   this.distributionSettings = settings.distribution.settings;
};

Connection.prototype.newAscoltatore = function(location){
    return new ascoltatori.RedisAscoltatore({
        redis       : redis,
        db          : this.distributionSettings.db,
        port        : this.distributionSettings.port,
        host        : this.distributionSettings.host,
        password    : this.distributionSettings.password
    });
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
};

Connection.prototype.getIpAddress = function(callback){
    this.newRedisClient(); // check wheter we have the redis client

    this.client.client("list", function(err, data){
        if (err === undefined){
            var regexResult = data.match(/addr=([^ ]*?):/);
            var myIP = regexResult[1];
            callback(myIP);
        }
    });
};

module.exports = Connection;