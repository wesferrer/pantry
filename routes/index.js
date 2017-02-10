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
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=20",
    headers: {
      'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
      'Accept': 'application/json'
    }
  };
  request(options, function(err, response, body) {
    var recipeData = JSON.parse(body);
    res.render('index', {user: req.user, recipeData});
  });
});

//complex search
router.post('/search', function(req, res, next) {
 var options = {
   url: rootURL + '/recipes/searchComplex?query=' + req.body.main + '&includeIngredients=' + req.body.ingredient1 + '%2C+' + req.body.ingredient2 + '%2C+' + req.body.ingredient3 + '&excludeIngredients=' + req.body.allergy1 + '%2C+' + req.body.allergy2 + '%2C+' + req.body.allergy3 + '&instructionsRequired=true&&fillIngredients=true&limitLicense=false&number=20&offset=0&ranking=1',
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var complexData = JSON.parse(body);
   var main = req.body.main;
   var ingred1 = req.body.ingredient1;
   var ingred2 = req.body.ingredient2;
   var ingred3 = req.body.ingredient3;
   var aller1 = req.body.allergy1;
   var aller2 = req.body.allergy2;
   var aller3 = req.body.allergy3;
   res.render('search-results', {user: req.user, recipes: complexData.results, main, ingred1, ingred2, ingred3, aller1, aller2, aller3});
 });
});

//Pantry search
router.post('/searchp', function(req, res, next) {
  var uPantry = req.user.pantry;
  var uRestrict = req.user.restrictions;
  var mystring = uPantry.toString();
  var convertP = mystring.replace(/,/g , "%2C+");
  var string = uRestrict.toString();
  var convertR = string.replace(/,/g , "%2C+");
  var options = {
   url: rootURL + '/recipes/searchComplex?excludeIngredients=' + convertR + '&includeIngredients=' + convertP + '&instructionsRequired=true&&fillIngredients=true&limitLicense=false&number=20&offset=0&ranking=1',
   headers: {
     'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
     'Accept': 'application/json'
   }
 };
 request(options, function(err, response, body) {
   var pantryData = JSON.parse(body);
   var main = req.body.main;
   var ingred1 = uPantry[0];
   var ingred2 = uPantry[1];
   var ingred3 = uPantry[2];
   var aller1 = uRestrict[0];
   var aller2 = uRestrict[1];
   var aller3 = uRestrict[2];
   res.render('search-results', {user: req.user, recipes: pantryData.results, main, ingred1, ingred2, ingred3, aller1, aller2, aller3});
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

