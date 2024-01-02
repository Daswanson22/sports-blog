const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ' + new Date().getTime())
  next()
});

// Define your routes here
router.get('/', (req, res) => {
  res.render('index', { title: 'Sports Blog' });
});

router.get('/')

module.exports = router;