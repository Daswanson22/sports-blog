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
        res.status(201).render("index", {articles: fetchRecentPosts()})
    } catch (error) {
        if(process.env.DEBUG) console.log(error)
        res.status(500).render('error', {error})
    }
}

const displayAccount = async (req, res) => {
    var authorized = req.session.authorized;
    res.render('compose', {title: "Compose", authorized });
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
        if(process.env.DEBUG) console.log(error)
        res.status(400).json({message: error.message});
    }
}

async function fetchRecentPosts() {
    try {
        var recentPosts = await Article.find()
        return recentPosts
    } catch (error) {
        if(process.env.DEBUG) console.log(error)
        return error 
    }
}

module.exports = {
    accountInfo, 
    createArticle, 
    displayAccount,
    fetchRecentPosts
};