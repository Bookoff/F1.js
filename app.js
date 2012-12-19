/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var Job = require('./mymodules/job.js').Job;
var nameserver = new Job('nameserver');
nameserver.run('./elements/nameserver.js');