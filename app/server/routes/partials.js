var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  res.render(req.url.replace(/^\//, 'partials/'));
});

module.exports = router;
