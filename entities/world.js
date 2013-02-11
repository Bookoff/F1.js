/**
 * Created with JetBrains WebStorm.
 * User: fil
 * Date: 12/02/13
 * Time: 0.04
 */

var Scheduler = require('./scheduler.js');

var schedule = new Scheduler();
var date = new Date();
console.log(date);
console.log(date.getMilliseconds());
schedule.wakeMeAfter(date, 3);