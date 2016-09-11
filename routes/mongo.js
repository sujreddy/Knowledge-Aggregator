var mongo = require('mongodb');//import mondodb
var assert = require('assert');//to check values 
var indexfile = require('./index');
var config = require('../config');

var encryptAndDecrypt = require('../EncryptAndDecrypt');

var password = encryptAndDecrypt.decrypt(config.mongo.password);
//console.log('Encrypted  password is '+password);

/* Url to connect mongodb which consists of local host with port number and database name */
//var url='mongodb://' + config.mongo.host  + ':' + config.mongo.port + '/local';
//var url = 'mongodb://bookmarkuser:bookmark@ds019816.mlab.com:19816/knowledgeaggregator';
var url = 'mongodb://' + config.mongo.username + ':' + password + '@' + config.mongo.dsportmlab + ':' + config.mongo.port + '/knowledgeaggregator';

var mongoObj  = {};

/* Object which contains all the methods to post data to mongo and fetch from Mongo */
 mongoObj.storebookmark =  function(item)
 {	
	console.log(item);
	var insertedToMongo=[];	
	var Encrypted=[];

	mongo.connect(url, function(err, db)
	{
	  	assert.equal(null, err);
	  	var collectionName=db.collection('bookmark');
	  	
	  	collectionName.insert(item, function(err, result)
	  	{
	  		assert.equal(null, err);
	  		//console.log('Item inserted');
	  		insertedToMongo.push(result);
	  		//console.log('Inserted data'+JSON.stringify(insertedToMongo));
	  		db.close();
	  	});

	})	
	  return insertedToMongo;
}

 mongoObj.getbookmarks = function(title, privacyType, username, company){
		
		//console.log('Request sending to mongodb ' +title+' '+privacyType);
		var resultArrayFromMongo=[];
		var sort = {'createdDate': -1};
		
		mongo.connect(url, function(err, db){
		assert.equal(null, err);
		//console.log('successfully connected with mongodb');
		
		var collection= db.collection('bookmark');
		
		var cursor = collection.find({Title: { $regex: title, $options: "i" }, 
		                              privacyType: privacyType, 
		                              Username: username, 
		                              Company: company }).sort(sort).limit(10);//.sort(sort).limit(10);//{Title: { $regex: title, $options: "i" }, privacyType: privacyType, Username: username, Company: company }.sort(sort).limit(10);
		
		//console.log('statistics ');//+ cursor.explain("executionStats").executionStats +'size is '
		//console.log('#Pointing to bookmark collection '+cursor);

		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			
			if(doc != null)
			{
				resultArrayFromMongo.push(doc);
			}
			else
			{
				resultArrayFromMongo.push('No results found');
			}
		}, 
		function()
		{
			db.close();

			//console.log('data from mongodb before urlDecryption '+JSON.stringify(resultArrayFromMongo));
			for(i=0; i<resultArrayFromMongo.length;  i++)
			{
				console.log('resultArrayFromMongo### '+JSON.stringify(resultArrayFromMongo[i].URL));
				var urlDecryption = encryptAndDecrypt.decrypt(resultArrayFromMongo[i].URL);
				resultArrayFromMongo[i].URL = urlDecryption;
				//console.log('##URL '+resultArrayFromMongo[i].URL);
			}

			//console.log('data from mongodb after urlDecryption '+JSON.stringify(resultArrayFromMongo));
			//console.log('##database has colsed');			
			return resultArrayFromMongo; 
		});
	});
		//return resultArrayFromMongo; 
	}


module.exports = mongoObj;