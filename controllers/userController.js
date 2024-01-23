const User = require('../models/user')
const Article = require('../models/article')

const edit = async (req, res, next) => {

    try {

    } catch(err) {

    }
}

const createArticle = async (req, res) => {
    const {title, metaSummary, content, links } = req.body;
    try {
        // Create new article.
        var article = new Article({
            title: title,
            meta_summary: metaSummary,
            content: content,
            links: links,
            username: req.session.username
        })

        // Save article to DB.
        await article.save()
        res.status(201).render("index")
    } catch (error) {
        res.status(500).render('error', {error})
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
    } catch(error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {accountInfo, createArticle};