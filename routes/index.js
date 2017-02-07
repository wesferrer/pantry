var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var request = require('request');
var Recipe = require('../models/recipe');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

router.get('/', function(req, res, next) {
  var options = {
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/4632/summary",
    headers: {
      'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
      'Accept': 'application/json'
    }
  };
  console.log(options);
  request(options, function(err, response, body) {
    var recipeData = JSON.parse(body);
    res.render('index', {user: req.user, recipeData});
  });
});

router.post('/search', function(req, res, next) {
 var options = {
   url: rootURL + '/recipes/search?query=' + req.body.search,
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var recipeData = JSON.parse(body);
   console.log(recipeData);
   res.render('search-results', {user: req.user, recipeData});
 });
});


router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
