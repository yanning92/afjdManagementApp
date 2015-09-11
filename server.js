'use strict';

var server = require('./app/app.js');

var conf = require('./app/configuration.js');
server.init(conf);

server.loadRoutes();

server.start(function() {
    console.log('Server started.');
});