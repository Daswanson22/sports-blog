const express = require('express');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// User access's their account.
router.get('/account', (req, res) => {
  var data = req.body; // User information to be displayed;
  var authorized = req.session.authorized;
  res.status(200).render('account', { authorized });
});

router.get('/compose', (req, res) => {
    var authorized = req.session.authorized;
    res.render('compose', {title: "Compose", authorized });
});

router.post('/compose', (req, res) => {
    res.send(req.body);
    // Post info in database.
    // Display on recent uploads
});

// Delete a user

// Edit a user

// Update a user

module.exports = router;