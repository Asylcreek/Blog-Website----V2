//Require all necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const routes = require(`${__dirname}/controller/routes.js`);

//Initialize express
const app = express();

//Set the view engine
app.set('view engine', 'ejs');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//Routes
app.get('/', routes.home);

app.get('/about', routes.about);

app.get('/contact', routes.contact);

app.get('/compose', routes.composeGet);

app.post('/compose', routes.composePost);

app.get('/posts/:slug', routes.singlePost);

app.listen(3000, () => console.log('Server started on port 3000'));