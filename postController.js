const content = require('./content');
const slugify = require('slugify');
const _ = require('lodash');
const Post = require('./postModel');

exports.getAllPosts = async(req, res) => {
    const posts = await Post.find();
    res.render('home', {
        homeStartingContent: content.homeStartingContent,
        posts,
    });
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
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;

    const newPost = await Post.create({ title: postTitle, content: postContent });

    res.redirect('/');
};

exports.getPost = async(req, res) => {
    //Get slug from request parameters
    let slug = req.params.slug;

    //Convert slug to lower case and remove all special characters
    slug = slugify(_.lowerCase(slug));

    const post = await Post.findOne({ slug });

    res.render('post', { post });
};