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
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id);
  });
}

function removeRestrictions(req, res, next) {
  req.user.restrictions.splice(req.user.restrictions.indexOf(req.params.rId), 1);
  req.user.save(function(err) {
    res.json({msg: 'Deleted restriction'});
  });
}

function addPantry(req, res, next) {
  req.user.pantry.push(req.body.pantry);
  req.user.save(function(err) {
    res.redirect('/users/' + req.user.id);
  });
}

function removePantry(req, res, next) {
  req.user.pantry.splice(req.user.pantry.indexOf(req.params.pId), 1);
  req.user.save(function(err) {
    res.json({msg: 'Deleted pantry item'});
  });
}

