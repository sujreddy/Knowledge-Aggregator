var config = {};

config.mongo = {};
config.web = {};

config.mongo.host = 'localhost';
config.mongo.port = 27017;
config.web.port = process.env.PORT || 3000;

module.exports = config;