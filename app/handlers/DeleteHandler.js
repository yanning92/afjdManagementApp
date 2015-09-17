/**
 * Created by yanning on 23/04/2015.
 */
'use strict';

var TodoService = require('../services/todoService');
function DeleteHandler(server) {
    if (!(this instanceof DeleteHandler)) {
        return new DeleteHandler(server);
    }
    DeleteHandler.prototype.server = server;
};

DeleteHandler.prototype.deleteOneTodo = function deleteOneTodo(req, reply) {
    var todoService = new TodoService();
    var id=req.params.id;
    todoService.deleteOneTodo(id).then(function (data) {
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

module.exports = DeleteHandler;
