const express = require('express');
const { accountInfo, createArticle } = require('../controllers/userController');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// User access's their account.
router.get('/account', accountInfo);

router.get('/compose', (req, res) => {
    var authorized = req.session.authorized;
    res.render('compose', {title: "Compose", authorized });
});

router.post('/compose', createArticle);

// Delete a user

// Edit a user
router.get('/edit', (req, res) => {
  res.render('edit');
});

// Update a user

module.exports = router;