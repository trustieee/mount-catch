require('dotenv').config();
const express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const request = require('request');

var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID;
var BNET_SECRET = process.env.BNET_SECRET;

const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the BnetStrategy within Passport.
passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/bnet/callback',
      region: 'us'
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use(cookieParser());
app.use(session({ secret: 'blizzard', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.get('/api/auth/bnet', passport.authenticate('bnet'));

app.get(
  '/api/auth/bnet/callback',
  passport.authenticate('bnet', { failureRedirect: '/error' }),
  function(req, res) {
    res.cookie('MOUNTCATCH_BNET_API_KEY', req.user.token);
    res.redirect('http://localhost:3000/foo');
  }
);

app.get('/api/all-mounts/:token', (req, res, next) => {
  const newurl = `https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us&locale=en_US&access_token=${
    req.params.token
  }`;
  request(newurl, (error, response, body) => {
    if (!error && response.statusCode === 200) res.send(JSON.parse(body));
  });
});

app.get('/api/mounts/:token', (req, res, next) => {
  const newurl = `https://us.api.blizzard.com/wow/character/bleeding-hollow/vessy?fields=mounts&locale=en_US&access_token=${
    req.params.token
  }`;
  request(newurl, (error, response, body) => {
    if (!error && response.statusCode === 200) res.send(JSON.parse(body));
  });
});

// app.get('/api', function(req, res) {
//   if (req.isAuthenticated()) {
//     var output = '<h1>Express OAuth Test</h1>' + req.user.id + '<br>';
//     if (req.user.battletag) {
//       output += req.user.battletag + '<br>';
//     }
//     output += '<a href="/logout">Logout</a>';
//     res.send(output);
//   } else {
//     res.send(
//       '<h1>Express OAuth Test</h1>' +
//         '<a href="/auth/github">Login with Github</a><br>' +
//         '<a href="/auth/bnet">Login with Bnet</a>'
//     );
//   }
// });

app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3001);
