const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const {username, email, password } = req.body;

    try {
        // Hash password, create new user, save user to DB.
        const user = new User({username, email, password});
        await user.save();
        // Send a confirmation page or redirect to home page.
        res.redirect('/auth/login');
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({username});

        if(!user)
        {
            res.status(404).json({message: 'User not found'});
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch)
        {
            res.status(401).json({message: 'Incorrect password'});
        }

        // Set session token with user id and secret key.
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });
        
        console.log("Authenticated");
        // Generate new session for security.
        

            req.session.authorized = true;
            req.session.genid = token;

            req.session.save(function(err) {
                if(err)
                {
                    next(err);
                }
            })
            res.redirect('/');
    } catch (err) {
        next(err);
    }
};

module.exports = {register, login };