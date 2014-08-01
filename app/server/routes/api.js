var express = require('express');
var router = express.Router();
var db = require('../config/db');
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.OPEN_TOK_API_KEY, process.env.OPEN_TOK_SECRET);

router.get('/events', function (req, res) {
  db.Event.findAll().success(function(events) {
    res.json(events);
  });
});

router.post('/events', function(req, res, next) {
  opentok.createSession(function(err, session) {
    if (err) {
      return next(err);
    } else {
      db.Event.create({
        name: req.param('name'),
        description: req.param('description'),
        sessionId: session.sessionId
      }).success(function(event) {
        res.json(event);
      });
    }
  });
});

module.exports = router;
