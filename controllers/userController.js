const User = require('../models/user');

const edit = async (req, res, next) => {

    try {

    } catch(err) {

    }
}

const accountInfo = async (req, res, next) => {

    try {
        // Get user information.
        console.log("Session username = " + req.session.username);
        var info = await User.find({username: req.session.username}, 'username email about');
        
        console.log(info);
        // Display account with user info.
        var authorized = req.session.authorized;
        res.status(200).render('account', { authorized, data: info});
    } catch(err) {
        return res.status(400).json({message: err.message});
    }
}

module.exports = {accountInfo};