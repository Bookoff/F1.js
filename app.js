/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var settings = require('./settings.js');

var main = function(){
    var entities = settings.distribution.localEntities;
    for (var entityName in entities){
        console.log('Loading ' + entities[entityName] + '...');
        var Entity = require('./entities/' + entities[entityName] + '.js');
        new Entity().start();
    }
    console.log("Entities loaded. Let's play!");
};

main();

var HeartBeatAscoltatore = require('./database/heartBeatAscoltatore.js');
var Connection = require('./database/connection.js');
var connection = new Connection();
var ascoltatore = connection.newAscoltatore();
var heartAscoltatore = new HeartBeatAscoltatore(ascoltatore, connection);

heartAscoltatore.subscribe('test', function(channel, data){
    console.log(channel);
    console.log(data);
});

heartAscoltatore.publish('test', {prova : 'uno'});