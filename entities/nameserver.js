/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

// http://blog.nodejitsu.com/http-proxy-intro

var createConnection = require('./../database/connection.js'),
    World = require('./world');

var NameServer = function(){
};

NameServer.prototype.start = function(distribution){
    var connection = createConnection(distribution);

    var channelName = "nameserver/register/";

    connection.subscribe(channelName + "*", function() {
        var channel = arguments[0];
        var entity = channel.split(channelName)[1];
        var data = arguments[1];
        console.log(entity);
        console.log(data);
    });

    connection.publish("nameserver/register/entity", {type : "car", "address" : "memory" }, function registerEntity() {
        console.log("message published");
    });
};

module.exports = NameServer;