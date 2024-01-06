const User = require('../models/user');
const client = require('../public/javascripts/signup.js');

exports.createUser = async function (req, res) {
    var error = false;

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
    });

    user.setPassword(req.body.password);

    try {
        const existingUserByEmail = await User.findOne({email: user.email});
        const existingUserByUsername = await User.findOne({username: user.username});

        if (existingUserByEmail) 
        {
            //client.invalid("email");
            res.status(200).render('signup', {message: "That email already exists."});
        }
        else if(existingUserByUsername)
        {
            res.status(200).render('signup', {message: "That username already exists."});
        }
        else
        {
            const newUSer = await user.save();
            res.status(201).redirect('http://localhost:3000/');
            console.log('User created: ', newUser);
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}
