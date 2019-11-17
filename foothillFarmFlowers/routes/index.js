var express = require('express');
var router = express.Router();
var request = require("request");
var flower = require('../models/Flowers');
var mongoose = require('mongoose');
var Flower = mongoose.model('Flower');

var fs = require('fs');
var BootstrapVue= require("bootstrap-vue");
var mailingList = [];



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

router.get('/getflowers/:flower', function(req, res) {
  res.json(req.flower);
});

router.param('flower', function(req, res, next, id) {
  var query = Flower.findById(id);
  query.exec(function (err, flower){
    if (err) { return next(err); }
    if (!flower) { return next(new Error("can't find flower")); }
    req.flower = flower;
    return next();
  });
});

router.get('/getflowers', function(req, res, next) {
  
  //console.log("in get flower route")
   Flower.find(function(err, flowers){
    if(err){ return next(err); }
    var filteredFlowers = flowers.filter(function(flower) {
        //console.log(flower);
    if(flower.colors.search(req.query.color)>=0 && flower.bloomMonths.search(req.query.month)>=0  && flower.variety.search(req.query.variety)>=0)
      return true;
  });
  
  
  res.status(200).json(filteredFlowers);
  
  }).sort({variety:1, name: 1});
  

});

router.put('/getflowers/:flower', function(req, res) {
    //console.log("In PUT Flowers Edit: " +req.params.id );
     
   //console.log(req.body);
    
    //executed in param route, req.flower contains the flower we need to update.
    req.flower.name = req.body.name;
    req.flower.colors = req.body.colors;
    req.flower.imageUrl = req.body.imageUrl;
    req.flower.bloomMonths = req.body.bloomMonths;
    req.flower.infoLink = req.body.infoLink; 
    req.flower.variety =  req.body.variety;
    
    req.flower.save();
    console.log('Updated document from the "flowers" collection.');
    res.end('{"success" : "Updated Successfully", "status" : 200}');
    
});


router.delete('/getflowers/:id', function(req, res) {
    console.log("In GET Flowers DELETE: " +req.params.id );

   Flower.deleteOne({ 
      _id: req.params.id 
    }, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result.deletedCount);
      console.log('Deleted document from the "flowers" collection.');
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  });
});


router.post('/getflowers', function (req, res, next){
 // console.log("ADDING Flower: " + req.body);
  const flower = new Flower(req.body);
  flower.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
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
