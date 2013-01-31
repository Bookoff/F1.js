/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var redis = require('redis'),
    Database = require('../database/client'),
    ascoltatori = require('../../ascoltatori');

//var Entity = require("../database/entity.js");

var database = new Database();

var ascoltatore = new ascoltatori.RedisAscoltatore({
  redis: redis,
  client_conn : new Database().getClient(),
  sub_conn: new Database().getClient()
});

ascoltatore.subscribe("nameserver/register/*", function() {
    console.log('received');
    var channel = arguments[0];
    var message = arguments[1];
    var entity = channel.split('/')[2];
//        if (entity !== null){
//        }
    console.log(entity);
    console.log(message);
});

ascoltatore.publish("nameserver/register/entity", {type : "car", "address" : "memory" }, function registerEntity() {
    console.log("message published");
});

var NameServer = function(){

};

NameServer.prototype.start = function(){

};

module.exports = NameServer;