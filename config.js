var config = {};

config.mongo = {};
config.web = {};

config.mongo.host = 'localhost';
config.mongo.port = 19816;//19816;//19816;//27017
config.mongo.password = '7643356f67a4a151206bb30aa04d47b9';
config.mongo.username = 'bookmarkuser';
config.mongo.dsportmlab = 'ds019816.mlab.com';
config.web.port = process.env.PORT || 3411;
console.log(config);


module.exports = config;