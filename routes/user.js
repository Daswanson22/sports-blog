const express = require('express');
const { accountInfo, createArticle, displayAccount } = require('../controllers/userController');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// User access's their account.
router.get('/account', accountInfo);

router.get('/compose', displayAccount)

router.post('/compose', createArticle);

// Delete a user

// Edit a user
router.get('/edit', (req, res) => {
  res.render('edit');
});

module.exports = router;