const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const Recipe = require('./server/models/Recipe.js');
// Middleware to handle PUT and DELETE requests
//app.use(methodOverride('_method'));
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');





const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();



app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.json());

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.get('/about', (req, res) => {
  res.render('about'); // This renders the about.ejs file
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Contact Form Route
app.get('/contact', (req, res) => {
  res.render('contact');  // Render the contact page
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Process the form submission (e.g., save to database, send an email)
  console.log('Form submitted:', { name, email, message });

  // Send a response after processing
  res.send('Thank you for contacting us! We will get back to you shortly.');
});


app.use(methodOverride('_method'));
app.delete('/recipe/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    try {
      
      const recipe = await Recipe.findOne({_id: req.params.id});
      console.log("recipe-----", recipe)
    } catch (error) {
      console.log(error)
    }
    console.log("-----------------")
    if (recipe) {
      res.status(200).send({ message: 'Recipe deleted successfully!' });
    } else {
      res.status(404).send({ message: 'Recipe not found!' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err });
  }
});


app.put('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (recipe) {
      res.status(200).send({ message: 'Recipe updated successfully!', recipe });
    } else {
      res.status(404).send({ message: 'Recipe not found!' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Server error', error: err });
  }
});


const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));


