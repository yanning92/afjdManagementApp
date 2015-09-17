/**
 * Created by yanning on 23/04/2015.
 */
'use strict';

var TodoService = require('../services/todoService');
function PatchHandler(server) {
    if (!(this instanceof PatchHandler)) {
        return new PatchHandler(server);
    }
    PatchHandler.prototype.server = server;
};

PatchHandler.prototype.patchOneTodo = function patchOneTodo(req, reply) {
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

module.exports = PatchHandler;