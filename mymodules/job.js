var path = require('path');

var Job = (function(){
	var EventEmitter = require("events").EventEmitter
		, spawn = require('child_process').spawn
		, inherits = require('util').inherits;

	function Job(id){
		EventEmitter.call(this);
		this.id = id;
	}

	inherits(Job, EventEmitter);

	Job.prototype.run = function(joinPath){
		console.log(path.join(joinPath));
		spawn(path.join(joinPath));
		return this;
	}
	return Job
})()

module.exports = {
  "Job" : Job
};