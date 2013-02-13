/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

// http://blog.nodejitsu.com/http-proxy-intro

var Connection  = require('./../database/connection.js'),
    settings    = require('../settings.js'),
    World       = require('./world');

var NameServer = function(){
    this.connection = new Connection();
    this.redisClient = this.connection.newRedisClient();
    this.ascoltatore = this.connection.newAscoltatore();

    this.registerChannel = settings.nameserver.registerChannel;
    this.assignmentChannel = settings.nameserver.assignmentChannel;
    this.pongChannel = settings.nameserver.pongChannel;
    this.pingChannel = settings.nameserver.pingChannel;

    this.onlineEntities = {};

    this.ascoltatore.subscribe(this.pongChannel + '*', function(channel, data){
        var entity = channel.split(this.pongChannel)[1];
        console.log('PONG' + entity);
        this.onlineEntities[entity] = new Date();
    });
};

NameServer.prototype.storeNewEntity = function(entity, data){
    var index = 1;
    var that = this;
    var originalEntity = entity;
    this.redisClient.keys(entity + "*", function (err, arrayOfKeys) {
        while (arrayOfKeys.indexOf(entity + index) !== -1){
            index++;
        }
        entity = entity + index;
        that.redisClient.hmset(entity, data, function hmsetCallback(){
            that.ascoltatore.publish(that.assignmentChannel + originalEntity, entity);
        });
    });
};

NameServer.prototype.start = function(){
    var that = this;

    this.ascoltatore.subscribe(this.registerChannel + "*", function(channel, data) {
        var entity = channel.split(that.registerChannel)[1];
        that.storeNewEntity(entity, data);
    });

    // move to client

    this.baseEntity = 'entity';
    this.entity = this.baseEntity;

    that.ascoltatore.subscribe(that.pingChannel + that.baseEntity, function(){
        that.ascoltatore.publish(that.pongChannel + that.entity);
    });

    this.ascoltatore.publish(this.registerChannel + this.baseEntity, {ip : "8.8.8.8", port : '3000'}, function registerEntity() {
        that.ascoltatore.subscribe(that.assignmentChannel + that.baseEntity, function(channel, newEntity){
            that.entity = newEntity;
        });
    });
};

module.exports = NameServer;