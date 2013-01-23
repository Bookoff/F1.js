/*
F1.js is a program written by Filnik

The program is release under the terms of MIT License.
*/

"use strict";

/*
var Job = require('./mymodules/job.js').Job;
var nameserver = new Job('nameserver');
nameserver.run('./elements/nameserver.js');

*/

//var sys = require("sys"),
//    b2d = require("box2d");
//
//// Define world
//var worldAABB = new b2d.b2AABB();
//worldAABB.lowerBound.Set(-100.0, -100.0);
//worldAABB.upperBound.Set(100.0, 100.0);
//
//var gravity = new b2d.b2Vec2(0.0, -10.0);
//var doSleep = true;
//
//var world = new b2d.b2World(worldAABB, gravity, doSleep);
//
//// Ground Box
//var groundBodyDef = new b2d.b2BodyDef();
//groundBodyDef.position.Set(0.0, -10.0);
//
//var groundBody = world.CreateBody(groundBodyDef);
//
//var groundShapeDef = new b2d.b2PolygonDef();
//groundShapeDef.SetAsBox(50.0, 10.0);
//
//groundBody.CreateShape(groundShapeDef);
//
//// Dynamic Body
//var bodyDef = new b2d.b2BodyDef();
//bodyDef.position.Set(0.0, 4.0);
//
//var body = world.CreateBody(bodyDef);
//
//var shapeDef = new b2d.b2PolygonDef();
//shapeDef.SetAsBox(1.0, 1.0);
//shapeDef.density = 1.0;
//shapeDef.friction = 0.3;
//body.CreateShape(shapeDef);
//body.SetMassFromShapes();
//
//// Run Simulation!
//var timeStep = 1.0 / 60.0;
//
//var iterations = 10;
//
//for (var i=0; i < 60; i++) {
//    world.Step(timeStep, iterations);
//    var position = body.GetPosition();
//    var angle = body.GetAngle();
//    sys.puts(i+": <"+position.x+", "+position.y+"> @"+angle);
//}

var express = require('express'),
    app = express(),
    fs  = require('fs'),
    http = require('http'),
    path = require('path'),
    ejs =require('ejs');

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
//app.post('/',facebookApp.accessFacebookApp)
//app.post('/index',facebookApp.index)
/*
 var server=https.createServer({
 key: fs.readFileSync('key.pem'),
 cert: fs.readFileSync('cert.pem'),
 requestCert: true,
 rejectUnauthorized: false
 },app)
 */
var server = http.createServer(app);

/*
 server.listen(app.get('port'), function(){
 console.log("Express server listening on port " + app.get('port'));
 });
 */


server.listen(app.get('port'), function(){
    console.log("Server listening on ".rainbow, server.address().port, app.settings.env.inverse );
});



