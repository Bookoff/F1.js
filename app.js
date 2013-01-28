/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var express         = require('express'),
    app             = express(),
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    ejs             = require('ejs'),
    EventEmitter    = require('events').EventEmitter;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');

    app.set('view engine', 'ejs');
    app.engine('html', ejs.renderFile);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(
        express.session(
            { secret: ' F1.js deep secret ' }
        )
    );
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

function main(req, res){
    var html = fs.readFileSync("public/index.html", "utf8");

    res.end(html);
}

app.get("/", main);
var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log("Server listening on ".rainbow, server.address().port, app.settings.env.inverse );
});


function World(configuration, driver) {
    this.emit('start');

    // read from the file, and for every chunk read, do:
    this.emit('data', chunkRead);
}
Car.prototype.__proto__ = EventEmitter.prototype;   // inherit from EventEmitter

var car = new Car('conf', 'driver');

stream.on('start', function() {
    console.log('Reading has started');
});

stream.on('data', function(chunk) {
    console.log('Received: ' + chunk);
});
