var express = require('express');
var router = express.router();
var recipesCtrl = require('../controllers/api/recipes');

route.get('/', recipesCtrl.getAllRecipes);
route.get('/:id', recipesCtrl.getOneRecipe);
