const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.render('index', { title: 'Express App' });
});

router.get('/')

module.exports = router;