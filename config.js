var config = {};

config.mongo = {};
config.web = {};
config.db = {};
config.salesforce = {};

config.db.type = 'mongodb';
config.mongo.host = 'localhost';
config.mongo.port = 19816;//19816;//19816;//27017
config.mongo.password = '7643356f67a4a151206bb30aa04d47b9';
config.mongo.username = 'bookmarkuser';
config.mongo.dsportmlab = 'ds019816.mlab.com';

/*config.db.type = 'dynamo';
config.dynamo.host = 'localhost';
config.dynamo.port = 19816;//19816;//19816;//27017
config.dynamo.password = '7643356f67a4a151206bb30aa04d47b9';
config.dynamo.username = 'bookmarkuser';
config.dynamo.dsportmlab = 'ds019816.mlab.com';*/

config.web.port = process.env.PORT || 3411;
config.web.key = 'a password';

config.salesforce.clientId = '3MVG9A2kN3Bn17hsWsLDatw._IRRcBapWFgecAzRUqAny5.wuHmAMejzvV7ZhFlTg5ZPNdHBDjS18Zu0cvgeN';
config.salesforce.clientsecret = '3585278186716093184';
config.salesforce.authorizeurl = 'https://login.salesforce.com/services/oauth2/authorize';
config.salesforce.tokenurl = 'https://login.salesforce.com/services/oauth2/token';
config.salesforce.callbackurl = 'http://localhost:3411/auth/forcedotcom/callback';

module.exports = config;