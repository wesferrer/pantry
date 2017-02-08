var User = require('../models/user');
var request = require('request');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

module.exports = {
  show,
  edit
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

// function update(req, res, next) {

// }

function addToPantry(req, res, next) {

}

//for recipes, vast majority of code goes here. if we don't have id stored, then we have to create ourselves.
