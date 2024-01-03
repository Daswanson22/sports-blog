const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use((req, res, next) => {
  console.log('Time: ' + new Date().getTime())
  next()
});

// Define your routes here
router.get('/', (req, res) => {
  res.render('index', { title: 'Sports Blog' });
});

// Debug Only
router.get('/all', async function(req, res) {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get('/')

module.exports = router;