/**
 * Created by yanning on 24/04/2015.
 */
'use strict';

var Joi = require('joi');
var GetHandler = require('../handlers/GetHandler');
var PostHandler = require('../handlers/PostHandler');
var PutHandler = require('../handlers/PutHandler');
var DeleteHandler = require('../handlers/DeleteHandler');

function menuRoutes(server) {
    if (!(this instanceof menuRoutes)) {
        return new menuRoutes(server);
    }
    menuRoutes.prototype.server = server;
}

menuRoutes.prototype.loadMenuRoutes = function (apiVersion) {
    var postHandler = new PostHandler(this.server);
    var getHandler = new GetHandler(this.server);
    var putHandler = new PutHandler(this.server);
    var deleteHandler = new DeleteHandler(this.server);

    this.server.route([
        {
            // Retrieve all menu items
            method: 'GET',
            path: '/menuItems',
            handler: getHandler.getAllMenuItems,
            config: {
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown()
                },
                description: 'Retrieve all menu items',
                tags: ['cms', 'menu']
            }
        },
        {
            // Create one todo
            method: 'POST',
            path: '/menuItem/add/{menuItemName}/{urlName}/{class}/{active}',
            handler: postHandler.postOneMenuItem,
            config:{
                validate: {
                    headers: Joi.object({
                        'accept': Joi.string().required().regex(/.*application\/json.*/)
                    }).unknown(),
                    params: Joi.object({
                        'menuItemName': Joi.string(),
                        'urlName': Joi.string(),
                        'class': Joi.string(),
                        'active': Joi.string()
                    })
                },
                description: 'post one tmenu item',
                tags: ['cms', 'menus']
            }
        }
    //    {
    //        // Create or update one todo TODO
    //        method: 'PUT',
    //        path: apiVersion + '/todos/update/{menuItem}/{name}/{description}/{assignee}/{type}/{status}',
    //        handler: putHandler.putOneTodo,
    //        config:{
    //            validate: {
    //                headers: Joi.object({
    //                    'accept': Joi.string().required().regex(/.*application\/json.*/)
    //                }).unknown(),
    //                params: Joi.object({
    //                    'menuItem': Joi.string(),
    //                    'name': Joi.string(),
    //                    'description': Joi.string(),
    //                    'type': Joi.string(),
    //                    'status': Joi.string(),
    //                    'assignee': Joi.string()
    //                })
    //            },
    //            description: 'put one todo by id',
    //            tags: ['api', 'todos']
    //        }
    //    },
    //    {
    //        // delete one todo
    //        method: 'DELETE',
    //        path: apiVersion + '/todos/delete/{id}',
    //        handler: deleteHandler.deleteOneTodo,
    //        config:{
    //            validate: {
    //                headers: Joi.object({
    //                    'accept': Joi.string().required().regex(/.*application\/json.*/)
    //                }).unknown(),
    //                params: Joi.object({
    //                    'id': Joi.number().integer()
    //                })
    //            },
    //            description: 'put one todo by id',
    //            tags: ['api', 'todos']
    //        }
    //    }
    ]);
};

module.exports = menuRoutes;