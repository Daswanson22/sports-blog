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

const getArticlePost = async function(req, res) {
    try {
        var clickedTitle = req.params.id
        var details = await Article.find({title: clickedTitle}).limit(1)

        if(details.length == 0) 
            throw ({message: `The article (${clickedTitle}) not found`, 
                    status: 404,
                    stack: "Unkown" })
        
        res.status(200).render('article', {article: details[0]})
    } catch(err) {
        res.status(404).render('error', {error: err})
    }
}

const postNewEmail = async function(req, res) {

    try {
        var email = process.env.EMAIL_LOGIN
        var password = process.env.EMAIL_PASSWORD

        // Struct with email information.
        var mailOptions = {
            from: req.body.email,
            to: `${email}`,
            subject: req.body.subject,
            text: `This message is from ${req.body.email} \n${req.body.message}`
        }

        var transport = transporter(email, password)

        // Sends the mail
        transport.sendMail(mailOptions, function(err, info) {
            if(err) {
                throw ({message: 'Internal server error',
                        status: 500,
                        stack: "We could not process your request. Try again."})
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        res.status(200).render('success')
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
    postNewEmail,
    getArticlePost
}