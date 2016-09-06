var config = {};

config.mongo = {};
config.web = {};

config.mongo.host = 'localhost';
config.mongo.port = 27017;
config.web.port = process.env.WEB_PORT || 9980;

module.exports = config;