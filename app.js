var debug = require('debug')('speed-dating');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./app/server/config/settings')

var app = express();

if (app.get('env') === 'development') {
  var dotenv = require('dotenv');
  dotenv.load();
}

var partials = require('./app/server/routes/partials');
var api = require('./app/server/routes/api');
var index = require('./app/server/routes/index');

var db = require('./app/server/config/db');

// view engine setup
app.set('views', path.join(__dirname, 'app/server/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/partials', partials);
app.use('/api', api);
app.get('*', index);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || settings.port);

db.sequelize
    .sync()
    .complete(function(err) {
      if (err) {
        throw err[0]
      } else {
        var server = app.listen(app.get('port'), function() {
          debug('Express server listening on port ' + server.address().port);
        });
      }
    });

module.exports = app;


