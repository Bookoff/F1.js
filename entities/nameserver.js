/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var createConnection = require('./connection.js'),
    World = require('./world');

var NameServer = function(){
};

NameServer.prototype.start = function(distribution){
    var connection = createConnection(distribution);

    connection.subscribe("nameserver/register/*", function() {
    });

    connection.publish("nameserver/register/entity", {type : "car", "address" : "memory" }, function registerEntity() {
        console.log("message published");
    });
};

module.exports = NameServer;