var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');


router.get('/:recipeId', isLoggedIn, recipesCtrl.addFav);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
router.get('/:recipeId/fav', recipesCtrl.addFav);
router.get('/:recipeId', recipesCtrl.show);
router.get('/', recipesCtrl.index);

module.exports = router;

