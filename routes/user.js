const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// Get all articles for user here.
router.get('/account', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
  //res.status(200).render('account');
});

router.get('/compose', (req, res) => {
    res.render('compose', {title: "Compose"});
});

router.post('/compose', (req, res) => {
    res.send(req.body);
    // Post info in database.
    // Display on recent uploads
});

// Delete a user

// Edit a user

// Update a user

// router.get('/')

module.exports = router;