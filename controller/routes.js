const content = require('../content');
const slugify = require('slugify');
const _ = require('lodash');

const posts = [];

exports.home = (req, res) => {
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

exports.composeGet = (req, res) => {
    res.render('compose');
};

exports.composePost = (req, res) => {
    const newPost = {
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
    };

    //Create a slug from the post title
    newPost.postSlug = slugify(_.lowerCase(newPost.postTitle));

    //Truncate if characters are more than 100
    const content = newPost.postContent;
    const contentLength = newPost.postContent.length;

    if (contentLength >= 100) {
        const truncContent = content.substr(0, 100);
        newPost.truncContent = `${truncContent} ...`;
    } else {
        newPost.truncContent = newPost.postContent;
    }

    //Push post to posts list
    posts.push(newPost);

    res.redirect('/');
};

exports.singlePost = (req, res) => {
    //Get slug from request parameters
    let slug = req.params.slug;

    //Convert slug to lower case and remove all special characters
    slug = slugify(_.lowerCase(slug));

    //Find the post that matches the slug
    const post = posts.find(({ postSlug }) => postSlug === slug);

    //Get title and content data from matched post
    const title = post.postTitle;
    const content = post.postContent;

    res.render('post', { title, content });
};