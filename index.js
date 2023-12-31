//External dependencies
var express = require("express");
var app = express();
require('dotenv').config()
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
var User = require("./api/models/users");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//ejs template engine
app.set("view engine", "ejs");

app.use(express.static('views' + '/static'));

//initialize body parser and morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Magic word for passport 
app.use(require("express-session")({
  secret: "My dear Gandalf from The Lord of the Rings",
  resave: false,
  saveUninitialized: false
}));


//Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
const productsRoutes = require('./api/routes/products');
const categoriesRoutes = require('./api/routes/categories');
const usersRoutes = require('./api/routes/users');
const listsRoutes = require('./api/routes/lists');
const shopsRoutes = require('./api/routes/shops');
const branchesRoutes = require('./api/routes/branches');
const scrapingRoutes = require('./api/routes/scrap');
const landingRoutes = require('./api/routes/landing');
const optionsRoutes = require('./api/routes/options');
const authRoutes = require('./api/routes/auth');
const locationsRoutes = require('./api/routes/locations');

app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/lists', listsRoutes);
app.use('/shops', shopsRoutes);
app.use('/branches', branchesRoutes);
app.use('/scrap', scrapingRoutes);
app.use('/', landingRoutes);
app.use('/locations', locationsRoutes);
app.use('/options', optionsRoutes);
app.use('/auth', authRoutes);


app.listen(process.env.PORT || 8181, async function () {
  console.log("listening on port " + (process.env.PORT || 8181));
});


// //Connect to MLAB database
// mongoose.connect("mongodb://diego:" + process.env.MLAB_PASSWORD + "@ds245234.mlab.com:45234/heroku_44n62dw0", {
//   useNewUrlParser: true
// });

// //Connect to local database
// /*
// mongoose.connect("mongodb://localhost/SSA");
// */

//Connect to MLAB database
mongoose.connect("mongodb://127.0.0.1:27017/testmogodb", {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);

});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

module.exports = app; 