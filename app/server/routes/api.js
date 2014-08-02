var express = require('express');
var router = express.Router();
var Event = require('../config/db').Event;
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.OPEN_TOK_API_KEY, process.env.OPEN_TOK_SECRET);

router.get('/events', function (req, res) {
  Event.findAll().success(function(events) {
    res.json(events);
  });
});

router.post('/events', function(req, res, next) {
  opentok.createSession(function(err, session) {
    if (err) {
      return next(err);
    } else {
      Event.create({
        name: req.param('name'),
        description: req.param('description'),
        sessionId: session.sessionId
      }).success(function(event) {
        res.json(event);
      });
    }
  });
});

router.get('/events/:id', function (req, res, next) {
  Event.find(req.param('id')).success(function(event) {
    res.json(event);
  });
});

router.post('/events/:id/publishers', function (req, res, next) {
  Event.find(req.param('id')).success(function(event) {
    token = opentok.generateToken(event.sessionId);
    res.json({token: token});
  });
});

module.exports = router;
