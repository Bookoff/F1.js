/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var schedule = require('node-schedule'),
    createConnection = require('./connection.js');

var Scheduler = function(){
};

Scheduler.prototype.wakeMeAfter = function(date, seconds){
    var oldSeconds = date.getSeconds();
    date.setSeconds(oldSeconds+seconds);
    date.setMilliseconds(0);

    var job = schedule.scheduleJob(date, function(){
        var date = new Date();
        console.log(date);
        console.log(date.getMilliseconds());
    });
};

module.exports = Scheduler;