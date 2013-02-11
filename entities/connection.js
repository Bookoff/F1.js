//http://phrogz.net/JS/classes/OOPinJS2.html

"use strict";

var redis = require("redis")
  , ascoltatori = require('ascoltatori')
  , settings = require('../settings.js');

module.exports = function createConnection(location){
    var distributionSettings = settings.distribution.settings;

    if (location == 'redis'){
        return new ascoltatori.RedisAscoltatore({
            redis       : redis,
            db          : distributionSettings.db,
            port        : distributionSettings.port,
            host        : distributionSettings.host,
            password    : distributionSettings.password
        });
    }

    return new ascoltatori.MemoryAscoltatore();
};