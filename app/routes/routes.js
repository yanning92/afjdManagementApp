/**
 * Created by yanning on 20/04/2015.
 */
'use strict';

var Joi = require('joi');
var GetHandler = require('../handlers/GetHandler');
var PostHandler = require('../handlers/PostHandler');
var PutHandler = require('../handlers/PutHandler');
var DeleteHandler = require('../handlers/DeleteHandler');
var menuRoutes = require('./menuRoutes');
function routes(server) {
    if (!(this instanceof routes)) {
        return new routes(server);
    }
    routes.prototype.server = server;
}

routes.prototype.loadAPIRoutes = function (apiVersion) {
    var postHandler = new PostHandler(this.server);
    var getHandler = new GetHandler(this.server);
    var putHandler = new PutHandler(this.server);
    var deleteHandler = new DeleteHandler(this.server);
    var menuroutes = new menuRoutes(this.server);

    this.server.route([
        {
            // Retrieve all todos
            method: 'GET',
            path: apiVersion + '/todos',
            handler: getHandler.getAll,
            config: {
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown()
                },
                description: 'Retrieve all todos',
                tags: ['api', 'todos']
            }
        },
        {
            // Retrieve one todo by id
            method: 'GET',
            path: apiVersion + '/todos/{id}',
            handler: getHandler.getOne,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'id': Joi.number().integer()
                    })
                },
                description: 'Retrieve one todo by id',
                tags: ['api', 'todos']
            }
        },
        {
            // Create one todo
            method: 'POST',
            path: apiVersion + '/todos/add/{menuItem}/{name}/{description}/{assignee}/{type}/{status}',
            handler: postHandler.postOneTodo,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'menuItem': Joi.string(),
                        'name': Joi.string(),
                        'description': Joi.string(),
                        'type': Joi.string(),
                        'status': Joi.string(),
                        'assignee': Joi.string()
                    })
                },
                description: 'post one todo',
                tags: ['api', 'todos']
            }
        },
        {
            // Create or update one todo TODO
            method: 'PUT',
            path: apiVersion + '/todos/update/{menuItem}/{name}/{description}/{assignee}/{type}/{status}',
            handler: putHandler.putOneTodo,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'menuItem': Joi.string(),
                        'name': Joi.string(),
                        'description': Joi.string(),
                        'type': Joi.string(),
                        'status': Joi.string(),
                        'assignee': Joi.string()
                    })
                },
                description: 'put one todo by id',
                tags: ['api', 'todos']
            }
        },
        {
            // patch one TODO todo
            method: 'PATCH',
            path: apiVersion + '/todos/update/{menuItem}/{name}/{description}/{assignee}/{type}/{status}',
            handler: putHandler.putOneTodo,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'menuItem': Joi.string(),
                        'name': Joi.string(),
                        'description': Joi.string(),
                        'type': Joi.string(),
                        'status': Joi.string(),
                        'assignee': Joi.string()
                    })
                },
                description: 'put one todo by id',
                tags: ['api', 'todos']
            }
        },
        {
            // delete one todo
            method: 'DELETE',
            path: apiVersion + '/todos/delete/{id}',
            handler: deleteHandler.deleteOneTodo,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'id': Joi.number().integer()
                    })
                },
                description: 'put one todo by id',
                tags: ['api', 'todos']
            }
        }
    ]);
    menuroutes.loadMenuRoutes();
};

module.exports = routes;