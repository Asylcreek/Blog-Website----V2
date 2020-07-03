const content = require('./content');
const slugify = require('slugify');
const _ = require('lodash');
const Post = require('./postModel');

exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.render('home', {
            homeStartingContent: content.homeStartingContent,
            posts,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.about = (req, res) => {
    res.render('about', { aboutContent: content.aboutContent });
};

exports.contact = (req, res) => {
    res.render('contact', { contactContent: content.contactContent });
};

exports.compose = (req, res) => {
    res.render('compose');
};

exports.createPost = async(req, res) => {
    try {
        const postTitle = req.body.postTitle;
        const postContent = req.body.postContent;

        await Post.create({ title: postTitle, content: postContent });

        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

exports.getPost = async(req, res) => {
    try {
        //Get slug from request parameters
        let slug = req.params.slug;

        //Convert slug to lower case and remove all special characters
        slug = slugify(_.lowerCase(slug));

        const post = await Post.findOne({ slug });

        res.render('post', { post });
    } catch (err) {
        console.log(err);
    }
};