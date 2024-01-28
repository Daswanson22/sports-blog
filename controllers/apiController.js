const Article = require("../models/article")
var nodemailer = require("nodemailer")
require("dotenv").config()

async function fetchRecentPosts() {
    try {
        var recentPosts = await Article.find().sort({"updatedAt": -1}).limit(5)
        return recentPosts
    } catch (error) {
        if(process.env.DEBUG) console.log(error)
        return error 
    }
}

const postNewEmail = async function(req, res) {

    try {
        var email = process.env.EMAIL_LOGIN
        var password = process.env.EMAIL_PASSWORD
        console.log(req.body)

        // Struct with email information.
        var mailOptions = {
            from: req.body.email,
            to: `${email}`,
            subject: req.body.subject,
            text: `This message is from ${req.body.email}: \n${req.body.message}`
        }

        var transport = transporter(email, password)

        // Sends the mail
        transport.sendMail(mailOptions, function(err, info) {
            if(err) {
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        var recentPosts = await fetchRecentPosts()

        res.status(200).render('index', {articles: recentPosts})
    } catch(error) {
        res.status(500).render("error", {error})
    }
}

// Creates a transport w/ nodemailer
function transporter(email, password) {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });
}


module.exports = {
    fetchRecentPosts,
    postNewEmail
}