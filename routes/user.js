const express = require('express');
const path = require('path')
const router = express.Router();
const Article = require('../models/article')

// path = /account/

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
});

// Get all articles for user here.
router.get('/account', async (req, res) => {
  // User loads their account:
  //    Get user information
  //    Get articles user has posted
  // try {
  //   const articles = await Article.find()
  //   res.render('account', articles);
  // } catch (err) {
  //   res.status(500).json({message: err.message});
  // }
  res.status(200).render('account');
});

router.get('/account/compose', (req, res) => {
    res.render('compose', {title: "Compose"});
});

router.post('/account/compose', (req, res) => {
    res.send(req.body);
    // Post info in database.
    // Display on recent uploads
});


router.get('/')

module.exports = router;