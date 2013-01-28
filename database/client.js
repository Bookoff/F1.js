/**
 * Author: Filnik
 * Creation date: 25/01/13 | 16:39
 * Project: F1.js
 * License: MIT
 */

"use strict";

var redis = require("redis"),
    settings = require('../settings.js');

var Client = function(){
    this.client = redis.createClient(settings.distribution.settings.port,
        settings.distribution.settings.host,
        {no_ready_check: true});

    this.client.auth(settings.distribution.settings.auth, function redisConnection(){
        console.log('connected to redis');
    });
};

Client.prototype.getClient = function(){
    return this.client;
};

module.exports = Client;