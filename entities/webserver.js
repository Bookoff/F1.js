/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , settings = require('../settings.js');

var WebServer = function(){
    var app = express();

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        // TODO: move to un-synced file
        app.use(express.cookieParser(settings.cookies.key));
        app.use(express.session());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function(){
        app.use(express.errorHandler());
    });
    this.app = app;
};

WebServer.prototype.start = function(){
    this.app = http.createServer(this.app).listen(this.app.get('port'), function(){
        console.log("Express server listening on port " + settings.express.port);
    });

    io.listen(this.app);
};

module.exports = WebServer;