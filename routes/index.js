var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var request = require('request');
var unirest = require('unirest');
var spoonCtrl = require('../controller/recipes')

const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

router.get('/:id', function (req, res, next){

})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
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

router.get('/', function(req, res) {
  request(rootURL + 'recipes/' + {id} + '/information')
    function(err, response, body) {
      res.render('index', {userData: body});
    }
  );
});


module.exports = router;
