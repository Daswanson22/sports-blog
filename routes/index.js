const express = require('express');
const router = express.Router();
const User = require('../models/user');
const API_Controller = require('../controllers/apiController')

router.use((req, res, next) => {
  //console.log('Time: ' + new Date().getTime())
  next()
});

// Define your routes here
router.get('/', async (req, res) => {
  res.locals.authorized = req.session.authorized;

  var recentPosts = await API_Controller.fetchRecentPosts()
  var debug = process.env.DEBUG
  //if(debug) { console.log("POST HEREs" + recentPosts) }
  
  res.render('index', {articles: recentPosts});
});

router.get('/contact', (req, res) => {
  res.status(200).render("contact")
})

router.get('/:id', API_Controller.getArticlePost)

// Debug Only
router.get('/all', async function(req, res) {
  try {
    const allUsers = await User.find();
    res.status(200).send(allUsers);
  } catch(err) {
    res.status(400).send(err.message);
  }
});



module.exports = router;