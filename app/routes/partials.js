var express = require('express');
var router = express.Router();

/* GET partials page. */
router.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('app/partials/' + name);
});

module.exports = router;
