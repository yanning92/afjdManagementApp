/**
 * Created by yanning on 24/04/2015.
 */
'use strict';
var Db = require('../db');

var Q = require('q');
var defer = Q.defer();
var db = new Db();
var result = [];
function menuService(Db) {

}

menuService.prototype.getAllMenuItems = function getAllMenuItems() {
    result = [];
    var dbClient = db.initDb();
    var queryPrepared = 'SELECT * FROM menuItems';
    var sqlQuery = dbClient.query(queryPrepared, function select(error, results, fields) {
        if (error) {
            console.log(error);
            dbClient.end();
            return;
        }
        if (results.length > 0) {
            var row;
            for (var i = 0; i < results.length; i++) {
                row = {
                    "menuItemName": results[i]['menuItemName'],
                    "urlName": results[i]['urlName'],
                    "class": results[i]['class'],
                    "active": results[i]['active']
                };
                result.push(row);
            }
        } else {
            console.log("Pas de données");
        }
        dbClient.end();
        defer.resolve(result);
    });

    return defer.promise;
};

menuService.prototype.postOneMenuItem= function postOneMenuItem(item) {
    var dbClient = db.initDb();
    var queryPrepared = 'INSERT INTO menuitems SET ?';
    dbClient.query(queryPrepared, [item], function select(error, results, fields) {
        if (error) throw error;
        result = results;
        //else results.send('success');
        dbClient.end();
        defer.resolve(result);
    });

    return defer.promise;
};


// TODO
menuService.prototype.putOneTodo = function putOneTodo(todo) {
    var dbClient = db.initDb();
    var queryPrepared = 'UPDATE todos SET description = ?,assignee= ?,taskstatus = ?,menuItem= ? WHERE taskName=?';

    try {

        dbClient.query(queryPrepared, [todo.description, todo.assignee, todo.taskstatus, todo.menuItem, todo.taskName], function select(error, results, fields) {
            if (error) throw error;
            result = results;
            //else results.send('success');
            dbClient.end();
            defer.resolve(result);
        });
    } catch (e) {
        console.log(e);
    }

    return defer.promise;
};

// TODO
menuService.prototype.patchOneTodo = function patchOneTodo(todo) {
    var dbClient = db.initDb();
    var queryPrepared = 'UPDATE todos SET description = ?,assignee= ?,taskstatus = ? WHERE taskName=?';
    dbClient.query(queryPrepared, [todo.description], [todo.assignee], [todo.taskstatus], [todo.taskName], function select(error, results, fields) {
        if (error) throw error;
        result = results;
        //else results.send('success');
        dbClient.end();
        defer.resolve(result);
    });

    return defer.promise;
};

menuService.prototype.deleteOneTodo = function deleteOneTodo(id) {
    var dbClient = db.initDb();
    var queryPrepared = 'DELETE FROM todos WHERE id=?';

    dbClient.query(queryPrepared, [id], function select(error, results, fields) {
        if (error) {
            throw error;
        }
        result = results;
        console.log('client removed successfully')

        //else results.send('success');
        dbClient.end();
        defer.resolve(result);
    });
    return defer.promise;
};

module.exports = menuService;