require('dotenv').config();
const fs = require('fs');
const express = require('express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const Axios = require('axios');
const request = require('request');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const accessFileAsync = util.promisify(fs.access);

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
    console.log(req.user.token);
    res.cookie('MOUNTCATCH_BNET_API_KEY', req.user.token);
    res.redirect('http://localhost:3000/foo');
  }
);

app.get('/api/mounts/:token', (req, res, next) => {
  const newurl = `https://us.api.blizzard.com/wow/character/bleeding-hollow/vessy?fields=mounts&locale=en_US&access_token=${
    req.params.token
  }`;
  request(newurl, (error, response, body) => {
    if (!error && response.statusCode === 200) res.send(JSON.parse(body));
  });
});

app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

const ALL_MOUNTS_FILE_NAME = 'all-mounts.json';
let finalMountData = [];

app.get('/api/all-mounts', (req, res, next) => {
  res.send(finalMountData);
});

(async () => {
  let fileExists = false;
  try {
    await accessFileAsync(ALL_MOUNTS_FILE_NAME);
    fileExists = true;
  } catch {}
  console.log('exists: ', fileExists);
  if (!fileExists) {
    console.log('empty all mounts created');
    console.log('writing all mounts');
    const firstResponse = await Axios({
      method: 'GET',
      url: `https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us&locale=en_US&access_token=${
        process.env.TEMPORARY_ACCESS_TOKEN
      }`
    });

    finalMountData = firstResponse.data.mounts.map(m => {
      const href =
        m.key.href +
        `&locale=en_US&access_token=${process.env.TEMPORARY_ACCESS_TOKEN}`;
      const id = m.key.href.match(/^.*data\/wow\/mount\/(\d+).*$/)[1];
      const name = m.name;
      return { id, href, name };
    });

    // by this point initial data is populated
    const allMountPromises = finalMountData.map(async mount => {
      const response = await Axios({
        method: 'GET',
        url: mount.href
      });
      const id = response.data.id;
      const name = response.data.name;
      const href = mount.href;
      let sourceType = null;
      let sourceName = null;
      if (response.data.source) {
        sourceType = response.data.source.type;
        sourceName = response.data.source.name;
      }
      return { id, name, sourceType, sourceName, href };
    });

    const finishedMountData = await Promise.all(allMountPromises);
    await writeFileAsync(
      ALL_MOUNTS_FILE_NAME,
      JSON.stringify(finishedMountData)
    );

    console.log('finished gathering final mount data from api');
  } else {
    console.log('mounts exist, storing it in memory now...');

    finalMountData = JSON.parse(await readFileAsync(ALL_MOUNTS_FILE_NAME));
    if (process.platform === 'win32') {
      const stats = fs.statSync(ALL_MOUNTS_FILE_NAME);
      console.log(`- created at ${stats.birthtime}`);
    }
  }

  console.log(`${finalMountData.length} mounts cached into memory`);
  // when we get here we have the mount data in memory
  //  start up the express api
  app.listen(3001, () => {
    console.log('server up');
  });
})().catch(e => {
  console.log('ERROR: ', e);
});
