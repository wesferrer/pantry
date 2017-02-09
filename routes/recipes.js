var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/:recipeId/fav', isLoggedIn, recipesCtrl.addFav);
router.get('/:recipeId', recipesCtrl.show);
router.get('/', isLoggedIn, recipesCtrl.index);
router.delete('/:id/fav', isLoggedIn, recipesCtrl.removeFav);
router.get('/:id/reviews/new', recipesCtrl.newReview);
router.post('/:id/reviews', recipesCtrl.createReview);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;

