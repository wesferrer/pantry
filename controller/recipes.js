var request = require('request');
const rootURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com';

module.exports = {
};

function search(req, res){
  var options = {
    url: rootURL + '/recipes/search?query=' + req.body.search,
    headers: {
      'X-Mashape-Key': process.env.SPOONACULAR_TOKEN
    }
  };
  request(options, function(err, response, body) {
    var usersData = JSON.parse(body);
    res.render('search-results', {usersData: usersData});
  });
}
