var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/:recipeId/fav', recipesCtrl.addFav);
router.get('/:recipeId', recipesCtrl.show);
router.get('/', recipesCtrl.index);

module.exports = router;

