/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

var express = require('express')
  , http = require('http')
  , path = require('path')
  , redis = require("redis")
  , io = require('socket.io')
  , ascoltatori = require('ascoltatori')
  , settings = require('../settings.json');

var app = express();

var client = redis.createClient(settings.redis.port, 
                            settings.redis.host, 
                            {no_ready_check: true});

client.auth(settings.redis.auth, function redisConnection(){
  console.log('connected to redis');
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // TODO: move to un-synced file
  app.use(express.cookieParser('temp_key'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + settings.express.port);
});

io.listen(app);

var ascoltatore = new ascoltatori.RedisAscoltatore({
  redis: redis,
  client : client
});


ascoltatore.subscribe("hello/*", function() {
  // this will print { '0': "hello/42", '1': "a message" }
  console.log(arguments);
});