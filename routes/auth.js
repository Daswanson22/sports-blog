const express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/user');
var AuthController = require("../controllers/authController");
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login');
});

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
  
      const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashed) => {
          if (err) {
            reject(err);
          } else {
            resolve(hashed);
          }
        });
      });

      if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password.buffer), hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
  
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }));
  

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST new user in the database.
router.post('/signup/newUser', AuthController.createUser);

module.exports = router;