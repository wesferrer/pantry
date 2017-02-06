var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Recipe = require('../models/recipe');

/* GET home page. */
router.get('/', function(req, res, next) {
  Recipe.find({}, function(err, recipes) {
  res.render('recipes/index', { recipes, user: req.user });
  })
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
