const User = require('../models/user');
const client = require('../public/javascripts/signup.js');

exports.insertUser = async function (req, res) {
    var error = false;

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
    });

    user.setPassword(req.body.password);

    // Case: Email already exists in db.
    if (User.find({email: user.email})) 
    {
        client.invalid("email");
        error = true;
    }
    // Case: Username already exists in db.
    if(User.find({username: user.username}))
    {
        client.invalid('username');
        error = true;
    }
    // Confirm that information is no reused.
    if (!error)
    {
        try {
      
            const newUser = await user.save()
                                  .then(user => console.log('User created:', user))
                                  .catch(err => console.error(err));;
            res.status(201).redirect('http://localhost:3000/');
            console.log("User Created");
          } catch (err) {
            res.status(400).json(err.message);
        }
    }
}
