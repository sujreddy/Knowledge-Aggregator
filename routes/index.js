var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongofile = require('./mongo');
var assert = require('assert');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' Knowledge Aggregator', condition: true });
});

/* Here is the post method to post data to web-server */
router.post('/submit', function(req, res) {
  
  console.log(req.body);
  var newbody = {};
  newBody = req.body;
  try {
  	
  	var fromMongo=[];
  	fromMongo=mongofile.postToMongo(newBody);
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
		var datafromOngo =  mongofile.fetchFromMongoDB(urlString.Title, urlString.privacyType, urlString.Username, urlString.Company);//urlString.Title, urlString.privacyType, urlString.Username, urlString.Company
		
		}	
		catch(e){
			console.log(e);
		}
		res.render('index', {items: datafromOngo});
});


module.exports = router;