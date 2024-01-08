const express = require('express');

const {register, login} = require("../controllers/authController");

const router = express.Router();

// Login form page.
router.get('/login', (req, res, next) => {
    res.render('login');
});

// Authenticate user.
router.post('/login', login);

// Display sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Create one user in DB.
router.post('/signup', register);

module.exports = router;