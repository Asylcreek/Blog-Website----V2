//Require all necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const postController = require(`${__dirname}/postController.js`);

//Initialize express
const app = express();

//Set the view engine
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Routes
app.get('/', postController.getAllPosts);

app.get('/about', postController.about);

app.get('/contact', postController.contact);

app.get('/compose', postController.compose);

app.post('/compose', postController.createPost);

app.get('/posts/:slug', postController.getPost);

module.exports = app;