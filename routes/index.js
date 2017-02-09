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
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1",
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
   url: rootURL + '/recipes/search?number=1&offset=0&query=' + req.body.search,
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var recipeData = JSON.parse(body);
   console.log(recipeData.results);
   res.render('search-results', {user: req.user, recipes: recipeData.results});
 });
});

//search by ingredient

router.post('/searchi', function(req, res, next) {
 var options = {
   url: rootURL + '/recipes/findByIngredients?ingredients=' + req.body.search + '&number=1',
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var ingredientData = JSON.parse(body);
   console.log(ingredientData);
   res.render('search-results', {user: req.user, recipes: ingredientData});
 });
});

//complex search
router.post('/searchc', function(req, res, next) {
 var options = {
   url: rootURL + '/recipes/searchComplex?query=' + req.body.main + '&includeIngredients=' + req.body.ingredient1 + '%2C+' + req.body.ingredient2 + '%2C+' + req.body.ingredient3 + '&excludeIngredients=' + req.body.allergy1 + '%2C+' + req.body.allergy2 + '%2C+' + req.body.allergy3 + '&instructionsRequired=true&&fillIngredients=true&limitLicense=false&number=5&offset=0&ranking=1',
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var complexData = JSON.parse(body);
   console.log(options);
   console.log(complexData);
   res.render('search-results', {user: req.user, recipes: complexData.results});
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

// function isLoggedIn(req, res, next) {
//   if ( req.isAuthenticated() ) return next();
//   res.redirect('/auth/google');
// }

module.exports = router;
