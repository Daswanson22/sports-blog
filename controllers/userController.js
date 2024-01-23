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

        var recentPosts = await fetchRecentPosts()
        res.status(201).render("index", {articles: recentPosts})
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
        var recentPosts = await fetchPostsByUsername(req.session.username)
        console.log("Authorized : " + authorized)
        console.log("Info: " + info)
        console.log(recentPosts)
        res.status(200).render('account', { authorized, data: info, articles: recentPosts});
    } catch(error) {
        if(process.env.DEBUG) console.log(error)
        res.status(400).json({message: error.message});
    }
}

// Cannot fetch by username
const fetchPostsByUsername = async function(un)
{
    console.log("USERNAME = " + un)
    try {
        var user_posts = await Article.find({
            username: un
        })
        if(process.env.DEBUG) console.log(user_posts)
        return user_posts
    } catch (err) {
        return err
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
    fetchRecentPosts,
    fetchPostsByUsername
};