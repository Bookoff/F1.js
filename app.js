/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var settings = require('./settings.js');

var main = function(){
    var entities = ['nameserver', 'webserver'];
    for (var entityName in entities){
        console.log('Loading ' + entities[entityName] + '...');
        var entity = require('./entities/' + entities[entityName] + '.js');
        new entity().start();
    }
    console.log("Entities loaded. Let's play!");
};

main();