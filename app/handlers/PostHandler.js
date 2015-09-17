/**
 * Created by yanning on 22/04/2015.
 */
'use strict';

var MenuService = require('../services/menuService');
var TodoService = require('../services/todoService');
function PostHandler(server) {
    if (!(this instanceof PostHandler)) {
        return new PostHandler(server);
    }
    PostHandler.prototype.server = server;
}
PostHandler.prototype.postOneTodo = function postOneTodo(req, reply) {
    var todoService = new TodoService();
    var todo={};
    todo.menuItem = req.params.menuItem;
    todo.taskName=req.params.name;
    todo.description =req.params.description;
    todo.assignee= req.params.assignee;
    todo.type=req.params.type;
    todo.taskstatus=req.params.status;

    todoService.postOneTodo(todo).then(function (data) {
        reply(data)
            .code(201)
            .header('Content-Type', 'application/json');
    }).catch(function (error) {
        // reply(boom.server_error(error.message))
        reply('error')
            .code(500)
            .type('application/json');
    });
};

PostHandler.prototype.postOneMenuItem = function postOneMenuItem(req, reply) {
    var menuService = new MenuService();
    var item = {};
    item.menuItemName = req.params.menuItemName;
    item.urlName = req.params.urlName;
    item.class = req.params.class;
    item.active = req.params.active;

    menuService.postOneMenuItem(item).then(function (data) {
        reply(data)
            .code(201)
            .header('Content-Type', 'application/json');
    }).catch(function (error) {
        // reply(boom.server_error(error.message))
        reply('error')
            .code(500)
            .type('application/json');
    });
};

module.exports = PostHandler;