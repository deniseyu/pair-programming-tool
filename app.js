var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var util = require('util')
var GitHubStrategy = require('passport-github').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
// database
var mongo = require('mongoskin')

// Github OAuth
var GITHUB_CLIENT_ID = process.env.GH_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GH_CLIENT_SECRET;

// Passport session setup
 passport.serializeUser(function(user, done){
     done(null, user);
});

passport.deserializeUser(function(obj, done){
     done(null, obj);
});

// this is the name of the database, not the directory
var db = mongo.db("mongodb://localhost:27017/pairingchart1", {native_parser:true});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

authentication.authenticate(passport);




// make db accessible for router
app.use(function(req, res, next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);



app.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){
             });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

app.listen(3000);

module.exports = app;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


