/**
 * Created by yanning on 20/04/2015.
 */

var conf = require('nconf');

conf.env('_');

conf.file({file:'configuration_default.json'});

if (conf.get('API_CONFIG_PATH')) {
    conf.file({file: conf.get('API_CONFIG_PATH')});
}

module.exports = conf;