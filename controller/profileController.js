//Required packages and pages

var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var userProfile = require('../controller/userProfile.js');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var session = require('express-session');
var item_info = require('./data_utility.js');
var userDB = require('./userDB.js');
var itemModel = require('../models/item.js');
var useritem = require('../models/userItem.js');
var user_item_model = require('../models/useritem_schema.js');
var mongoose = require('mongoose');
expressValidator = require('express-validator');
var itemModel = require('../models/item.js');

const { check,validationResult } = require('express-validator/check');
app.use(express.json())
app.use(expressValidator());

//Get data from database
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;



//***************************************POST REQUESTS**********************************************************//

//Index page after user logs in
app.post('/',urlencodedParser,
        [check('email').isEmail().isLength({ min: 3}).withMessage('Must be only alphabetical chars')
        .custom(async email => {
            var user = await userDB.getUser(email);
            if (user[0] == undefined) {return false; } else {return true;}}).withMessage('Username invalid'),
        check('password').isAlphanumeric().isLength({ min: 3}).withMessage('Must be only alphanumeric chars')
        .custom(async (pass, { req }) => {
             var user = await userDB.getUser(req.body.email);
             if (pass == user[0].password){return true;} else{ return false;}}).withMessage('Password invalid')],
async function(req, res){

    //Logs validation results if error
    console.log(validationResult(req).array());

     const errors = validationResult(req);

     //Renders login page with error message if errors are present
     if (!errors.isEmpty()) {
               res.render('login', { error:errors});
      }
      else{
        if(!(req.session.user)){

          //Renders index page if no error with user details
            var user_email = req.body.email;
            var user_details = await userDB.getUser(user_email);
            var user_name = user_details[0].first_name;
            req.session.user = user_name;
            req.session.user_id = user_details[0].user_id;

    }

      //Gets userData and starts session
      var temp = userProfile.getProfileData(req.session.user_id);
      temp.then( val =>{
      let result = JSON.stringify(val);
      res.render('index', {sess: req.session.user});
});
}});


//Feedback Page
app.post('/feedback',urlencodedParser,async function(req, res){
  if (!(req.session.user)){
    res.redirect('/login');
  }

  //Gets required item data from post request
  if(req.body.item_flag=='update'){
      var item_code = req.body.item_code;
      item_data= await item_info.getItem(item_code);
      var img = '../assets/images/'+item_code+'.jpg'
      res.render('feedback',{item_data : item_data, sess: req.session.user, image_url : img});
  };

});


//Profile Page/ MyItems Page
app.post('/myItems', urlencodedParser, async function(req,res){

  if (!(req.session.user)){
    res.redirect('/login');
  }
  var user_id = req.session.user_id;
  if(req.body.item_flag=='add'){
    var ic = req.body.item_code ;
    await userProfile.addItem(ic, user_id);
  }

  if(req.body.item_flag=='delete'){
    var ic = req.body.item_code ;
    await userProfile.removeItem(ic, user_id);
  }

  if(req.body.item_flag=='rate'){

    var my_rating = req.body.selectpicker_1;
    var read_it = req.body.selectpicker_2;

    await userProfile.updateItem(req.body.itemCode, user_id, my_rating, read_it, false);

  }

  res.redirect('/myItems');
});


//*****************************************GET REQUESTS******************************************************//

//Index Page
app.get('/',function(req,res){
  res.render('index',{sess: req.session.user});
});


//Feedback Page
app.get('/feedback',urlencodedParser, function(req, res){
    res.redirect('/categories');
  }
);

//Sign In Page
app.get('/login',urlencodedParser, function(req,res){
  //checks for active session and either signs in or out
  if(req.session.user){
      req.session.destroy(function(err){
        if (err){
          res.negotiate(err);
        }
        res.redirect('/');
      });
  }
  else{

  if(!(req.session.user)){

    req.session.user_id = req.body.email;
  }
  res.render('login',{sess: req.session.user});
};
});

//About page
app.get('/about', function (req, res) {
    res.render('about', {sess: req.session.user});
});


//Contact page
app.get('/contact', function (req, res) {
    res.render('contact', {sess: req.session.user});
});

//My Items page
app.get('/myItems', async function (req, res) {
  if (!(req.session.user)){
    res.redirect('/login');
  }

 if(req.session){
    var item_data = await userProfile.getProfileData(req.session.user_id);
    itemdata =[];
    for (i=0;i<item_data.length;i++){
      temp =   await useritem.user_item(item_data[i].item_code,item_data[i].my_rating,item_data[i].read_it, "");
      itemdata.push(temp);
  }
          res.render('myItems', {item_data:await itemdata ,  sess: req.session.user});

  }
  else{
    res.redirect('/');
  }
});


//Home page
app.get('/', function (req, res) {
    res.render('index.ejs', {sess: req.session.user});
});

//Sign In page
app.get('/login', function (req, res) {
    res.render('login', {sess: req.session.user});
});


//Error page
app.get('/*', function (req, res) {
    res.render('error', {sess: req.session.user});
});


module.exports = app;
