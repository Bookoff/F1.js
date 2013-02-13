/**
 * Author: Filnik
 * Creation date: 13/02/13 | 16:26
 * Project: F1.js
 * License: MIT
 */

"use strict";

var Connection = require('./connection.js');

var HeartBeatAscoltatore = function(ascoltatore, connection, heartbeat, deathTime){
    this.ascoltatore = ascoltatore;
    this.connectedChannels = [];
    this.heartbeatTimers = [];
    this.subscribedEntities = {};
    this.id = undefined;
    this.connection = connection;
    this.heartbeat = 1000;
    this.deathTime = 3; // 3*heartbeat
    if (heartbeat !== undefined){
        this.heartbeat = heartbeat;
    }
    if (deathTime !== undefined){
        this.deathTime = deathTime;
    }

    setTimeout(function(){
        for (var key in this.subscribedEntities){
            if (this.subscribedEntities[key] - new Date() > this.heartbeat * this.deathTime){
                var keySplit = key.split("_heartbeat_");
                var channel = keySplit[0];
                var id = keySplit[1];
                this.emit('node_death', {channel: channel, id : id});
            }
        }
    }, this.heartbeat);
};

HeartBeatAscoltatore.prototype.subscribe = function(){
    var channel = arguments[0];
    var message = arguments[1];
    if (message.heartbeat !== undefined){
        this.subscribedEntities[channel + "_heartbeat_" + message.heartbeat] = new Date();
    }else{
        this.ascoltatore.subscribe.apply(this, arguments);
    }
};

HeartBeatAscoltatore.prototype.unsubscribe = function(){
    this.ascoltatore.unsubscribe.apply(this, arguments);
};

HeartBeatAscoltatore.prototype.publish = function(){
    var that = this;

    this.ascoltatore.publish.apply(this, arguments);
    var channel = arguments[0];
    if (this.connectedChannels.indexOf(channel) === -1){
        this.connectedChannels.push(channel);

        var heartbeatTimer = setInterval(function(){
            if (this.id === undefined){
                this.id = that.connection.getIpAddress(function getIpCallback(){
                    this.ascoltatore.publish(arguments[0], {'heartbeat' : that.id});
                });
            }else{
                this.ascoltatore.publish(arguments[0], {'heartbeat' : that.id});
            }
        }, this.heartbeat);
        this.heartbeatTimers.push(heartbeatTimer);
    }
};

HeartBeatAscoltatore.prototype.close = function(){
    this.ascoltatore.subscribe.close(this, arguments);
    for (var heartbeatTimer in this.heartbeatTimers){
        clearInterval(heartbeatTimer);
    }
};

module.exports = HeartBeatAscoltatore;