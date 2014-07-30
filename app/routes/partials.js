var express = require('express');
var router = express.Router();

/* GET partials page. */
router.get('*', function(req, res) {
  var name = req.url.replace(/^\//, '');
  res.render('partials/vents/index');
});

module.exports = router;
