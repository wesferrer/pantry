var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', usersCtrl.show);
router.get('/:id/edit', usersCtrl.edit);

module.exports = router;




