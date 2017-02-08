var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/:recipeId/fav', isLoggedIn, recipesCtrl.addFav);
router.get('/:recipeId', isLoggedIn, recipesCtrl.show);
router.get('/', isLoggedIn, recipesCtrl.index);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;

