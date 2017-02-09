var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/api/recipes');

router.get('/', recipesCtrl.getAllRecipes);
router.get('/:id', recipesCtrl.getOneRecipe);

module.exports = router;
