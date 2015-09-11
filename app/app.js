'use strict';

var Hapi = require('hapi');
//var hapiSwaggered = require('hapi-swaggered');
var hapiSwaggeredUi = require('hapi-swaggered-ui');

var server = new Hapi.Server();
var apiVersion = '';

server.init = function (conf) {
    apiVersion = '/v' + conf.get('afjdManagementApp:apiVersion');

    server.logger = require('./logger.js')(conf);

    server.connection({
        host: conf.get('afjdManagementApp:listening_address'),
        port: conf.get('afjdManagementApp:port'),
        routes: {
            cors: true
        },
        labels: ['afjdManagementApp']
    });

    server.register({
        register: hapiSwaggeredUi,
        options: {
            title: 'Manage a meeting session',
            swaggerOptions: {
                docExpansion: 'list'
            }
        }
    }, {
        select: 'afjdManagementApp',
        routes: {
            prefix: '/documentation'
        }
    }, function (err) {
        if (err) {
            throw err;
        }
    });

    server.on('response', function (request) {
        var c = {};
        c.path = request.path;
        c.method = request.method;
        c.id = request.id;
        c.info = request.info;
        server.logger.info(c);
    });

    require('http').globalAgent.maxSockets = Infinity;
    require('http').globalAgent.keepAlive = true;

    server.logger.info('Server configured on ' + server.info.uri);
};

server.init = function (conf) {
    apiVersion = '/v' + conf.get('afjdManagementApp:apiVersion');

    server.logger = require('./logger.js')(conf);

    server.connection({
        host: conf.get('afjdManagementApp:listening_address'),
        port: conf.get('afjdManagementApp:port'),
        routes: {
            cors: true
        },
        labels: ['afjdManagementApp']
    });

    server.register({
        register: hapiSwaggeredUi,
        options: {
            title: 'Francoise\'s website Api reference.',
            swaggerOptions: {
                docExpansion: 'list'
            }
        }
    }, {
        select: 'afjdManagementApp',
        routes: {
            prefix: '/documentation'
        }
    }, function (err) {
        if (err) {
            throw err;
        }
    });

    server.on('response', function (request) {
        var c = {};
        c.path = request.path;
        c.method = request.method;
        c.id = request.id;
        c.info = request.info;
        server.logger.info(c);
    });

    require('http').globalAgent.maxSockets = Infinity;
    require('http').globalAgent.keepAlive = true;

    server.logger.info('Server configured on ' + server.info.uri);
};


server.loadRoutes = function () {
    //API routes
    var ApiRoutes = require('./routes/apiRoutes');
    var apiRoutes = new ApiRoutes(server);
    apiRoutes.loadAPIRoutes(apiVersion);
};

module.exports = server;
