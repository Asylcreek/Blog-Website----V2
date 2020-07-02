const mongoose = require('mongoose');
const slugify = require('slugify');
const _ = require('lodash');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    shortContent: String,
    slug: String,
    dateCreated: Date,
});

postSchema.pre('save', function(next) {
    this.dateCreated = Date.now();

    this.slug = slugify(_.toLower(this.title));

    //Truncate if characters are more than 100
    if (this.content.length > 100) {
        const truncatedContent = this.content.substr(0, 100);
        this.shortContent = `${truncatedContent} ...`;
    } else {
        this.shortContent = this.content;
    }

    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;