var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  res.render('index', { openTokApiKey: process.env.OPEN_TOK_API_KEY });
});

module.exports = router;
