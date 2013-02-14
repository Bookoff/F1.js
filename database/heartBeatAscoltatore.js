/**
 * Author: Filnik
 * Library over ascoltatori to extend it with the heartbeat
 * License: MIT
 */

"use strict";

var Connection = require('./connection.js'),
    EventEmitter = require('events').EventEmitter;

var HeartBeatAscoltatore = function(ascoltatore, connection, heartbeat, deathTime){
    EventEmitter.call(this);
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

    var that = this;
    setInterval(function(){
        for (var key in that.subscribedEntities){
            console.log(new Date() - that.subscribedEntities[key]);
            if (new Date() - that.subscribedEntities[key] > that.heartbeat * that.deathTime){
                var keySplit = key.split("_heartbeat_");
                var channel = keySplit[0];
                var id = keySplit[1];
                that.emit('nodeDeath', {channel: channel, id : id});
            }
        }
    }, this.heartbeat * this.deathTime);
};

HeartBeatAscoltatore.prototype = Object.create(EventEmitter.prototype);

HeartBeatAscoltatore.prototype.subscribe = function(channel, callback){
    var that = this;

    this.ascoltatore.subscribe(channel, function myHeartBeatCallback(channel, message){
        if (message.heartbeat !== undefined){
            that.subscribedEntities[channel + "_heartbeat_" + message.heartbeat] = new Date();
        }else{
            callback(channel, message);
        }
    });
};

HeartBeatAscoltatore.prototype.unsubscribe = function(){
    this.ascoltatore.unsubscribe.apply(this.ascoltatore, arguments);
};

HeartBeatAscoltatore.prototype.publish = function(){
    var that = this;

    this.ascoltatore.publish.apply(this.ascoltatore, arguments);
    var channel = arguments[0];

    if (this.connectedChannels.indexOf(channel) === -1){
        this.connectedChannels.push(channel);

        var heartbeatTimer = setInterval(function(){
            if (that.id === undefined){
                that.connection.getIpAndPort(function getIpCallback(id){
                    that.id = id;
                    that.ascoltatore.publish(channel, {'heartbeat' : that.id});
                });
            }else{
                that.ascoltatore.publish(channel, {'heartbeat' : that.id});
            }
        }, this.heartbeat);
        this.heartbeatTimers.push(heartbeatTimer);
    }
};

HeartBeatAscoltatore.prototype.close = function(){
    for (var heartbeatTimer in this.heartbeatTimers){
        clearInterval(heartbeatTimer);
    }
    this.ascoltatore.close(this.ascoltatore, arguments);
};

module.exports = HeartBeatAscoltatore;