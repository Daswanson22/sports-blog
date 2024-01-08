const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// User access's their account.
router.get('/account', authenticate, (req, res) => {
  var data = req.body; // User information to be displayed;
  res.status(200).render('account', data);
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