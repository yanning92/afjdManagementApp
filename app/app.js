/**
 * Created by yanning on 20/04/2015.
 */
'use strict';

var Hapi = require('hapi');
var hapiSwaggered = require('hapi-swaggered');
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

    //server.register({
    //        register: hapiSwaggered,
    //        options: {
    //            descriptions: {
    //                'API': 'Francoise\'s website api reference'
    //            },
    //            info: {
    //                title: 'Francoise\'s website api reference',
    //                description: 'Documentation for the Francoise\'s website Api reference.',
    //                version: conf.get('afjdManagementApp:apiVersion') + ''
    //            }
    //        }
    //    },
    //    {
    //        select: 'afjdManagementApp',
    //        routes: {
    //            prefix: '/swagger'
    //        }
    //    },
    //    function (err) {
    //        if (err) {
    //            server.logger.error('hapi-swaggered load error: ' + err);
    //        } else {
    //            server.logger.info('hapi-swaggered interface loaded');
    //        }
    //    }
    //);

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
    // Version Route
    server.route(
        {
            method: 'GET',
            path: apiVersion + '/version',
            handler: function (req, reply) {
                server.logger.debug('Request GET /version');
                reply(require('../package.json').version);
            }
        }
    );

    //API routes
    var ApiRoutes = require('./routes/routes');
    var apiRoutes = new ApiRoutes(server);
    apiRoutes.loadAPIRoutes(apiVersion);
};

module.exports = server;