var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var BootstrapVue= require("bootstrap-vue");
var mailingList = [];
var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
  //console.log("Connnecting...");
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    
    /**
     * TODO: insert data here, once we've successfully connected
     */
       var db = client.db('flowers'); //Connect to the database flowers
    db.createCollection('availableFlowers', function(err, result) { // If it exists, it will just connect to it
      collection = result;
      // Do something with the collection here
       // Only do the insert if the collection is empty
      collection.stats(function(err, stats) {
        if (err) { console.log(err) }
        if (stats.count == 0) { // If we havent inserted before, put the default in
          collection.insertMany(flowers, function(err, result) {
            if (err) { console.log(err) }
            else {
              console.log('Inserted documents into the "availableFlowers" collection. The documents inserted with "_id" are:', result.length, result);
            }
          });
        }
      });
    }); // Get the collection
  }
});


function compare(a, b) {
  //console.log("in compare a: " + a +" b: " +  b);
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});


router.get('/insta', function(req, res, next) {
    //console.log("in insta route")
    //console.log(req.query);
    if(req.query!==null)
    {
      var UserID = req.query.UserID;
      var AccessToken = req.query.AccessToken;
    }
    else{
     var UserID = "";
      var AccessToken = "";
    }
   // console.log("userID: " + UserID);
    //console.log("accessToken: " + AccessToken);
    var instarest = "https://api.instagram.com/v1/users/" + UserID + '/media/recent?access_token=' + AccessToken;
    //console.log(instarest);
    request(instarest).pipe(res);
});
router.get('/weather', function(req, res, next) {
    //console.log("in weather route")
   // console.log(req.query);
    var apiKey = req.query.apiKey;
   // console.log("apiKey: " + apiKey);
    var applicationKey = req.query.applicationKey;
    var weatherrest = 'https://api.ambientweather.net/v1/devices/?apiKey=' + apiKey + '&applicationKey=' + applicationKey;
    console.log(weatherrest);
    request(weatherrest).pipe(res);
});


router.get('/getflowers', function(req, res, next) {
  //console.log("in get flower route")
   collection.find().toArray(function(err, result) {
    if (err) { console.log(err); }
    else if (result.length) {
      console.log("Query Worked");
      //console.log(result);
      //res.send(result);
       //console.log("All FLowers: " + flowers);
  var filteredFlowers = result.filter(function(flower) {
    //console.log("query: " + req.query.color);
   // console.log("flower colors " + flower.colors + " flower bloomtime: " + flower.bloomMonths);
    if(flower.colors.search(req.query.color)>=0 && flower.bloomMonths.search(req.query.month)>=0  && flower.variety.search(req.query.variety)>=0)
      return true;
  });
  
  //console.log("Filtered FLowers: " + filteredFlowers);
  filteredFlowers.sort(compare);
 // console.log("Filtered FLowers: " + filteredFlowers);
  res.status(200).json(filteredFlowers);
    }
    else {
      console.log("No Documents found");
    }
  });
 

});




router.post('/getflowers', function(req, res) {
    console.log("In GETFlowers Post");
    console.log(req.body);
   collection.insertOne(req.body, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Inserted document into the "flowers" collection.');
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  });
});
router.get('/mailingList', function(req, res) {
    console.log("In Mailing List GET");
    console.log(req.body);
    res.status(200).json(mailingList);
}); 

router.post('/mailingList', function(req, res) {
    console.log("In Mailing List Post");
    //console.log(req.body);
    mailingList.push(req.body);
    console.log(mailingList);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
