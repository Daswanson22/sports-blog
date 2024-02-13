const express = require('express');
const { accountInfo, createArticle, displayAccount, fetchArticleToUpdate, updateArticle } = require('../controllers/userController');
const article = require('../models/article');
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
router.get('/edit/:id', fetchArticleToUpdate);

router.post('/edit/:id', updateArticle);

module.exports = router;