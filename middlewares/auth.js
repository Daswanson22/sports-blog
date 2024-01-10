const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const token = req.session.genid;
    console.log("Token = " + token);
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // Find user with session token.
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if session has stored a user.
        if(req.session.authorized)
        {
            next();
        } else {
            next('/');
        }
      
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
  module.exports = { authenticate };