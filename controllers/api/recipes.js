var express = require('express');
var router = express.router();

module.exports = {
  getAllRecipes
  getOneRecipe
}

function getAllRecipes(req, res, next){
  Recipe.find({}, function(err, recipes){
    res.status(200).json(recipes);
  });
}

function getOneRecipe(req, res, next){
  Recipe.findById(req.params.id, function(err, recipe){
    res.status(200).json(recipe);
  });
}
