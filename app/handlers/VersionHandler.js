'use strict';

var VersionService = require('../services/versionService');

function VersionHandler(server) {
    if (!(this instanceof VersionHandler)) {
        return new VersionHandler(server);
    }
    VersionHandler.prototype.server = server;
}
VersionHandler.prototype.getVersion = function getVersion(req, reply) {
    var versionService = new VersionService();
    versionService.getVersion().then(function (data) {
        reply(data)
            .code(200)
            .header('Content-Type', 'application/json');
    }).catch(function (error) {
        // reply(boom.server_error(error.message))
        reply('error')
            .code(500)
            .type('application/json');
    });
};

module.exports = VersionHandler;