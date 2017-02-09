var User = require('../models/user');
var request = require('request');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

module.exports = {
  show,
  edit,
  addRestrictions,
  removeRestrictions,
  addPantry,
  removePantry
}

function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/show', {user});
  })
}

function edit(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    res.render('users/edit', {user});
  })
}

function addRestrictions(req, res, next) {
  req.user.restrictions.push(req.body.restrictions);
  // req.body.restrictions = req.body.restrictions.replace(/\s*,\s*/g, ',');
  // if (req.body.restrictions) req.body.restrictions = req.body.restrictions.split(',');
  // for (var key in req.body.restrictions) {
    // if (req.body.restrictions[key] === '') delete req.body.restrictions[key];
  // }
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id + '/edit');
  });
}

function removeRestrictions(req, res, next) {
  req.user.restrictions.splice(req.user.restrictions.indexOf(req.params.rId), 1);
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id);
  });
}

function addPantry(req, res, next) {
  req.user.pantry.push(req.body.pantry);
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id + '/edit');
  });
}

function removePantry(req, res, next) {
  req.user.pantry.splice(req.user.pantry.indexOf(req.params.rId), 1);
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id);
  });
}
