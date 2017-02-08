var Recipe = require('../models/recipe');
var request = require('request');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

module.exports = {
  show: show,
  addFav: addFav
}

function show(req, res, next) {

}

function addFav(req, res, next) {
  Recipe.findOne({recipeId: req.params.recipeId}, function(err, recipe) {
    if (recipe) {

console.log('FOUND IT')
      if (!req.user.favorites.some(fav => fav._id === recipe._id)) {
        req.user.favorites.push(recipe._id);
        console.log(recipe._id)
        req.user.save(function(err) {
          res.render('recipes/index', {recipe});
        });
      } else {
          res.render('recipes/index', {recipe});
        }
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


console.log(recipeData)


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
          res.render('recipes/show', {user: req.user, recipe: newRecipe});
        });
      });
      // addRecipe(options);// then call the addRecipe helper function that adds to collection
      // req.user.favorites.push(recipe._id);// then add recipe to req.user.favorites
      // user.save(function (err, user) {
      //   if (err) console.log('error');
      //   res.render('recipes/show', {recipe}); // then after added, res.render('recipes/show', {recipe});
      // });
    }
  });
}




// helper functions

// function addRecipe(recipe) {
// //var obj = parse?JSON object;
//   Recipe.create({
//     title: recipe.title,
//     recipeId: recipe.id,
//     ingredients: recipe.ingredients.name,
//     directions: recipe.instructions,
//     calories: recipe.nutrition.nutrients,
//     // sodium:
//     // fat:
//     // protein:
//     // carbs:
//     // fiber:
//     cookingMinutes: recipe.cookingMinutes,
//     preparationMinutes: recipe.preparationMinutes,
//     servingSize: recipe.servings,
//     imageUrl: recipe.image,
//     // review:
//   });

