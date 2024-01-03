const express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/user');
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

router.post('/signup/newUser', async function insert(req, res) {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    hashed_password: crypto.createHash('md5').update(req.body.password).digest('hex')
  })

  try {
    const newUser = await user.save()
                          .then(user => console.log('User created:', user))
                          .catch(err => console.error(err));;
    res.status(201).json(newUser);
    console.log("User Created");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;