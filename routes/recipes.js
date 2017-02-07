var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
var request = require('request');

router.get('/:recipeId', recipesCtrl.addFav);

module.exports = router;

