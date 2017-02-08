var Recipe = require('../models/recipe');
var User = require('../models/user');
var request = require('request');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

module.exports = {
  show: show,
  addFav: addFav,
  index: index
};

function index(req, res, next) {
  getPopulatedUser(req.user._id)
  .then(user => res.render('recipes/index', {recipes: user.favorites}));
}


function show(req, res, next) {
	var query = (req.params.recipeId.length < 24) ?
		{recipeId: req.params.recipeId} : {_id: req.params.recipeId};
	Recipe.findOne(query, function (err, recipe) {
		res.render('recipes/show', {recipe});
	})
}

function addFav(req, res, next) {
  Recipe.findOne({recipeId: req.params.recipeId}, function(err, recipe) {
    if (recipe) {
      if (!req.user.favorites.some(fav => fav.equals(recipe._id))) {
        req.user.favorites.push(recipe._id);
        req.user.save(function(err) {
          getPopulatedUser(req.user._id)
          .then(user => res.render('recipes/index', {recipes: user.favorites}));
        });
      } else {
        getPopulatedUser(req.user._id)
        .then(user => res.render('recipes/index', {recipes: user.favorites}));
      } ;
    } else {
      // fetch recipe from the api
      var options = {
        url: rootURL +'/recipes/' + req.params.recipeId + '/information?includeNutrition=true',
        headers: {
          'X-Mashape-Key': process.env.SPOONACULAR_TOKEN,
          'Accept': 'application/json'
        }
      };
      request.get(options, function(err, response, body) {
        var recipeData = JSON.parse(body);
        var newRecipe = new Recipe({
          title: recipeData.title,
          recipeId: recipeData.id,
          directions: recipeData.instructions,
          // calories: recipeData.nutrition.nutrients,
        // sodium:
              // fat:
              // protein:
              // carbs:
              // fiber:
          cookingMinutes: recipeData.cookingMinutes,
          preparationMinutes: recipeData.preparationMinutes,
          servingSize: recipeData.servings,
          imageUrl: recipeData.image
              // review:
        });
        recipeData.extendedIngredients.forEach(function(ing) {
          newRecipe.ingredients.push({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit
          });
        });
        newRecipe.save(function(err) {
          req.user.favorites.push(newRecipe._id);
          req.user.save(function(err) {
            getPopulatedUser(req.user._id)
            .then(user => res.render('recipes/index', {recipes: user.favorites}));
          });
        });
      });
    }
  });
}


// helper functions

function getPopulatedUser(userId) {
  return User.findById(userId).populate('favorites').exec();
  // res.render('recipes/index', {user: req.user, recipes: user.favorites}); - if we need to use user
};
 
