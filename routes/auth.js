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

router.get('/logout', (req, res) => {
    // Clear user session.
    //console.log("Deleting session token: " + req.session.genid);
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.sendStatus(500); // Internal Server Error
        } else {
            // Redirect the user to the home page or any other desired page
            res.redirect('/');
        }
    });
});

module.exports = router;