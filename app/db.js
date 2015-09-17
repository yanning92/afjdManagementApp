/**
 * Created by yanning on 21/04/2015.
 */
'use strict';
var conf = require('../app/configuration.js');
var mysql = require('mysql');

function db() {

}

db.prototype.initDb= function initDb(){
    var mySqlClient = mysql.createConnection({
        host     : conf.get('mysql:host'),
        user     : conf.get('mysql:user'),
        password : conf.get('mysql:password'),
        database : conf.get('mysql:database')
    });
  return mySqlClient;
};

module.exports=db;
