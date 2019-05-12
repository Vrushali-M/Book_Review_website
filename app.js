//required Pages
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var session = require('express-session');
expressValidator = require('express-validator');


//For initializing session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

//Gets Routing Pages
var regular_pages = require('./controller/profileController.js');
var category_pages = require('./controller/catalog_controller.js');

//Routes to different routing pages
app.use('/categories',category_pages);
app.use('/',regular_pages);

//Start server
app.listen(8080,function(){
    console.log('app started');
    console.log('listening on port 8080');
});
