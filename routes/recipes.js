var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
var request = require('request');

router.get('/:recipeId', isLoggedIn, recipesCtrl.addFav);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;

