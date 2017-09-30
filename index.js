//Bandwidth's required modules
var Bandwidth = require("node-bandwidth");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);


//Captal One 
//Username: Sbertrand101
//API Key: 6a78782c0a1d95f0414764152a564ea9
//Capital One's required module
var request = require('superagent');

//Requesting list of merchant Ids
// request.get('http://api.reimaginebanking.com/merchants?lat=35.9186170&lng=-79.0358380&rad=100&key=6a78782c0a1d95f0414764152a564ea9').end(function(req, res){
//  var merchantIds = [];

//  if (res.body.data.length > 1){
//  	for(var i=0; i < res.body.data.length; i++){
//  		merchantIds[i] = res.body.data[i]._id;
//  		console.log(merchantIds[i]);
//  	}
//  }
//  else{
//  	console.log(res.body._id);
//  }
// });

//first merchant: 57cf75cea73e494d8675ec4a
//Derick's Account: 59cfc308a73e4942cdafdf07
var myKey = '6a78782c0a1d95f0414764152a564ea9';

request.get('http://api.reimaginebanking.com/accounts?type=Checking&key=' + myKey).end(function(req, res){
	console.log("Derrick's Account Number: " + res.body[0]._id + " and made a purchase"); //this is a database, access with body[i]
	//Requesting Ids of checking accounts
	//Returns Derrick's checking account number

	request.get('http://api.reimaginebanking.com/accounts/' + res.body[0]._id + '/purchases?key=' + myKey).end(function(req, res){
		console.log(res.body); //this is a database, access with body[i]
		//Creating a purchas at first merchant with Derrick's Account
		//Returns successful purchase!

		request.get('http://api.reimaginebanking.com/accounts/' + res.body[0].payer_id + '/purchases?key=' + myKey).end(function(req, res){
			console.log("Printing merchant ids of purchases");
			//Requesting all purchases from Derrick's Account
			//Returns list of purchases
			var merchantIds = [];
			if (res.body.length > 0){
			 	for(var i=0; i < res.body.length; i++){
			 		merchantIds[i] = res.body[i].merchant_id;
			 		console.log(merchantIds[i]);
			 	}
			 }
			request.get('http://api.reimaginebanking.com/merchants/'+ merchantIds[0]+ '?key=' + myKey).end(function(req, res){
				console.log(res.body);
				console.log(res.body.geocode);
				//Request info of merchant
				//Returns geolocation
			});
		});
	});
});