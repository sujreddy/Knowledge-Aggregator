var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongofile = require('./mongo');
var assert = require('assert');
var url = require('url');

var encryptAndDecrypt = require('../EncryptAndDecrypt');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' Knowledge Aggregator', condition: true });
});

/* Here is the post method to post data to web-server */
router.post('/submit', function(req, res) {
  
  var encrptedbody={};
  console.log(req.body);
  var newbody = {};
  newBody = req.body;
  encrptedbody = encryptAndDecrypt.encrypt(req.body.URL);
  req.body.URL = encrptedbody;
  try {
  	
  	var fromMongo=[];
  	fromMongo=mongofile.postToMongo(req.body);
  	console.log('###After submition '+fromMongo);
  	res.json(newbody);

  }
  catch(e){
  	console.log(e);
  }
});

/* Here is the methood to fetch data from MongoDB */

router.get('/get-data/', function(req, res){
	var url_parts = url.parse(req.url, true);

	var urlString=url_parts.query;
	console.log('urlString '+urlString.Title +urlString.privacyType);
	var urlTitle="/"+urlString.Title+"/i";
	console.log('urlTitle '+urlTitle);
	
	var datafromOngo=[];
	var newbody={};
	newbody=req.body;
	
	
	try{
		datafromOngo =  mongofile.fetchFromMongoDB(urlString.Title, urlString.privacyType, urlString.Username, urlString.Company);//urlString.Title, urlString.privacyType, urlString.Username, urlString.Company
		console.log('datafromOngo in index file '+JSON.stringify(datafromOngo));
		}	
		catch(e){
			console.log(e);
		}
		res.render('index', {items: datafromOngo});
});


module.exports = router;