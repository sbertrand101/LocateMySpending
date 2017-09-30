//Bandwidth's required modules
var Bandwidth = require("node-bandwidth");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var http = require("http").Server(app);

var client = new Bandwidth({
	userId    : process.env.BANDWIDTH_USER_ID,  //<-- note, this is not the same as the username you used to login to the portal
	apiToken  : process.env.BANDWIDTH_API_TOKEN,
	apiSecret : process.env.BANDWIDTH_API_SECRET
});

var NUMBERS = {
	to   : "+18286385873", //YOUR_NUMBER
	from : "+18282372835"	//BANDWIDTH_NUMBER
	};


app.use(bodyParser.json());
app.set('port', (process.env.PORT || 80));
app.get("/", function(req, res){				//at certain address, takes in request and response
	console.log(req);							//listening FOR a GET request at the '/' (root domain)
	res.send("Locate My Spending");
});
http.listen(app.get('port'), function(){
	console.log('listening on *:' + app.get('port'));
});


app.post("/message-callback", function (req, res){
	var body = req.body;
	res.sendStatus(200);

	if( body.direction === "in" && 
	    body.state === "received" && 
	    ((body.text.search("yes") >= 0) || 
	    (body.text.search("Yes") >= 0))){

	   		sendMessage(NUMBERS, "Ok, just checking. Thank you for your response!");
	}
	else if(body.direction === "in" && 
		body.state === "received" && 
		((body.text.search("no") >= 0) || 
		(body.text.search("No") >= 0))){

			sendMessage(NUMBERS, "There is high risk that your accounts are being used by an unauthorized third party.  Please contact your bank to confirm this information to cancel your card.");
	}
	else{
			sendMessage(NUMBERS, "Please state Yes or No.");
	}
});


var messagePrinter = function (message){
	console.log('Using the message printer');
	console.log(message);
}

var sendMessage = function(params, text){
	return client.Message.send({
		from : params.from,
		to   : params.to,
		text : text
	})
	.then(function(message){
		messagePrinter(message);				//print message sent
		return client.Message.get(message.id); 	//get message id
	})
	.then(messagePrinter)						//else, print error message
	.catch(function(err){
		console.log(err);
	});
}


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
var MAX_DISTANCE = 100;

var createCustomers ={
	"newCustomers" : 
[{
  "first_name": "Geraldine",
  "last_name": "Marin-Zamora",
  "address": {
    "street_number": "38",
    "street_name": "Puffy Cheetos Street",
    "city": "Chapel Hill",
    "state": "NC",
    "zip": "27514"
  	}
 },
{
  "first_name": "Stephanie",
  "last_name": "Bertrand",
  "address": {
    "street_number": "38",
    "street_name": "Peppermint Lane",
    "city": "Chapel Hill",
    "state": "NC",
    "zip": "27514"
  	}
}]
};



 request.get('http://api.reimaginebanking.com/accounts?type=Checking&key=' + myKey).end(function(req, res){
 	console.log("Derrick's Account Number: " + res.body[0]._id + " and made a purchase"); //this is a database, access with body[i]
	//Requesting Ids of checking accounts
	//Returns Derrick's checking account number
	var input = {
			"merchant_id": "57cf75cea73e494d8675ec4a",
 			"medium": "balance",
			"purchase_date": "2017-09-30",
			"amount": 130,
			"description": "I wanna dessert test"
			}
	request.post({
//		url: 'http://api.reimaginebanking.com/accounts/' + res.body[0]._id + '/purchases?key=' + myKey',
		url: 'http://api.reimaginebanking.com/accounts/59cfc308a73e4942cdafdf07/purchases?key=6a78782c0a1d95f0414764152a564ea9',
		headers: {
			'content-type' : 'application/json',
			'accept' : 'application/json'
		},
		body: JSON.stringify(input),
		json: true})
		// body: {
		// 	'merchant_id': '57cf75cea73e494d8675ec4a',
 		// 	'medium': 'balance',
		// 	'purchase_date': '2017-09-30',
		// 	'amount': 130.00,
		// 	'description': 'I wanna dessert test'
		// 	}})
		.end(function(req, res, err){
		console.log("test"); 
		console.log(req + "req");
		console.log(res + "res"); 
		console.log(err + "err");

	});
});

//request.post({}).end(function(req, res, error))


