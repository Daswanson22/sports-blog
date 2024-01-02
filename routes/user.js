const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/account', (req, res) => {
  // fetch user info and pass to page
  res.render('account', { title: 'Account' });
});

router.get('/compose', (req, res) => {
    res.render('compose', {title: "Compose"});
});

router.post('/compose', (req, res) => {
    console.log(req.body);
    // Post info in database.
    // Display on recent uploads
});


router.get('/')

module.exports = router;