/**
 * Created by yanning on 20/04/2015.
 */
'use strict';

var Hapi = require('hapi');
var Good = require('good');

var server = require('./app/app.js');
var conf = require('./app/configuration.js');

server.init(conf);

server.loadRoutes();
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

