var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var request = require('request');
var Recipe = require('../models/recipe');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

//index, need to edit
router.get('/', function(req, res, next) {
  var options = {
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=8",
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

//general recipe search
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
   res.render('search-results', {user: req.user, recipeData});
 });
});

//search by ingredient
router.post('/ingredientSearch', function(req, res, next) {
 var options = {
   url: rootURL + 'findByIngredients?ingredients=' + req.body.search,
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var recipeData = JSON.parse(body);
   res.render('search-results', {user: req.user, recipeData});
 });
});

//oauth
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
