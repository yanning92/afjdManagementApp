'use strict';
var package_json = require('../../package.json');
var Q = require('q');
var defer = Q.defer();

function VersionService() {

}

VersionService.prototype.getVersion = function getVersion() {
    defer.resolve(package_json.version);
    return defer.promise;
};


module.exports = VersionService;