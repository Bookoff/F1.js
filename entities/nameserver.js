/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

// http://blog.nodejitsu.com/http-proxy-intro

var Connection = require('./../database/connection.js'),
    World = require('./world');

var NameServer = function(){
    this.connection = new Connection();
    this.redisClient = this.connection.newRedisClient();
};

NameServer.prototype.start = function(distribution){
    var channelName = "nameserver/register/";

    this.ascoltatore = this.connection.newAscoltatore(distribution);

    console.dir(this.redisClient.send_command('list', [], function(data){console.log('!!' + data)}));

    this.ascoltatore.subscribe(channelName + "*", function() {
        var channel = arguments[0];
        var entity = channel.split(channelName)[1];
        var data = arguments[1];
        console.log(entity);
        console.log(data);
    });

    this.ascoltatore.publish("nameserver/register/entity", {type : "car", "address" : "memory" }, function registerEntity() {
        console.log("message published");
    });
};

module.exports = NameServer;