const User = require('../models/user')
const Article = require('../models/article')
const API_Controller = require("./apiController")
const updateArticle = async (req, res) => {
    const authorized = req.session.authorized
    console.log(req.body)
    try {
        // let doc = await Article.findOne({title: req.params.id})
        
        // doc.title = req.body.title
        // doc.meta_summary = req.body.metaSummary
        // doc.content = req.body.content

        // await doc.save()
        accountInfo()
    } catch(err) {
        res.status(500).render('error', {error: err})
    }
}

const fetchArticleToUpdate = async (req, res) => { 
    const authorized = req.session.authorized
    try {
        const request_title = req.params.id
        const info = await Article.find({title: request_title}).limit(1)
        console.log("info = " + info[0])
        if(info == null) {
        throw({message: "Could not find the post you want to edit.",
                status: 400,
                stack: "unkown"})
        } else {
        res.render('edit', {authorized, article: info[0]});
        }
    } catch (err) {
        res.status(400).render('error', {error: err})
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

        var recentPosts = await API_Controller.fetchRecentPosts()
        res.status(201).render("index", {articles: recentPosts})
    } catch (error) {
        if(process.env.DEBUG) console.log(error)
        res.status(500).render('error', {error})
    }
}

const displayAccount = async (req, res) => {
    var authorized = req.session.authorized;
    res.render('compose', {authorized, articles:[] });
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
        res.status(500).render('error', {error: {message: "Could not find user information", status: 500, stack: "Unkown"}});
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

module.exports = {
    accountInfo, 
    createArticle, 
    displayAccount,
    fetchPostsByUsername,
    fetchArticleToUpdate,
    updateArticle
};