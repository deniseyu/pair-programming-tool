var express = require('express');
// var passport = require('passport');
// var util = require('util')
// var GitHubStrategy = require('password-github').Strategy;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Makers Academy Pair Programming Tool', user: req.user });
});

// router.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

// router.get('/login', function(req, res){
//   res.render('login', { user: req.user })
// });

// router.get('/auth/github',
//   passport.authenticate('github'),
//   function(req, res){
// });

// router.get('/auth/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function(req, res){
//     res.redirect('/');
// });



module.exports = router;
