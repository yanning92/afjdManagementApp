'use strict';

var Joi = require('joi');
//var GetHandler = require('../handlers/GetHandler');
var VersionHandler = require('../handlers/VersionHandler');
//var PostHandler = require('../handlers/PostHandler');
//var PutHandler = require('../handlers/PutHandler');
//var DeleteHandler = require('../handlers/DeleteHandler');
//var menuRoutes = require('./menuRoutes');
function apiRoutes(server) {
    if (!(this instanceof apiRoutes)) {
        return new apiRoutes(server);
    }
    apiRoutes.prototype.server = server;
}

apiRoutes.prototype.loadAPIRoutes = function (apiVersion) {
    var versionHandler = new VersionHandler(this.server);
    this.server.route([
        {
            // Retrieve application version
            method: 'GET',
            path: apiVersion + '/version',
            handler: versionHandler.getVersion(apiVersion),
            config: {
                //validate: {
                //    headers: Joi.object({
                //        'accept': Joi.string().required().regex(/.*application\/json.*/)
                //    }).unknown()
                //},
                description: 'Retrieve application version',
                tags: ['api', 'version']
            }
        }
    ]);
};

module.exports = apiRoutes;