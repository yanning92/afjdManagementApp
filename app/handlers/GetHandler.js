/**
 * Created by yanning on 20/04/2015.
 */
'use strict';
var TodoService = require('../services/todoService');
var MenuService = require('../services/menuService');
function GetHandler(server) {
    if (!(this instanceof GetHandler)) {
        return new GetHandler(server);
    }
    GetHandler.prototype.server = server;
}
GetHandler.prototype.getAll = function getAll(req, reply) {
    var todoService = new TodoService();
    todoService.getTodos().then(function (data) {
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

GetHandler.prototype.getAllMenuItems = function getAllMenuItems(req, reply) {
    var menuService = new MenuService();
    menuService.getAllMenuItems().then(function (data) {
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

GetHandler.prototype.getOne = function getOne(req, reply) {
    var todoService = new TodoService();
    var id=req.params.id;
    todoService.getOneTodo(id).then(function (data) {
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

module.exports = GetHandler;