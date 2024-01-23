const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserController = require('../controllers/userController')

router.use((req, res, next) => {
  console.log('Time: ' + new Date().getTime())
  next()
});

// Define your routes here
router.get('/', async (req, res) => {
  res.locals.authorized = req.session.authorized;
  if(process.env.DEBUG) console.log(UserController.fetchRecentPosts())
  
  res.render('index', {articles: UserController.fetchRecentPosts()});
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



module.exports = router;