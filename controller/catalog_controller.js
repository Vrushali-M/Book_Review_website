//Required Packages
var express = require('express');
var router = express.Router();
var item_info = require('./data_utility.js');
var item = require('../models/item.js');
var regular_pages = require('./profileController.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var session = require('express-session');
expressValidator = require('express-validator');
var itemModel = require('../models/item.js');

const { check,validationResult } = require('express-validator/check');
router.use(express.json())
router.use(expressValidator());

//For initializing session
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

router.post('/', urlencodedParser,
          [check('category_search').isAlpha().isLength({ min: 2}).withMessage('Must be only alphabetical chars')],
          async function(req,res){
          console.log(validationResult(req).array());
          const errors = validationResult(req);

          //Capitalize function for case handling
          String.prototype.capitalize = function() {
          return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
          };

//gets data from body
var bodyreq = req.body;
console.log(req.body);

//Checks if search is initiated
  if(typeof(bodyreq.category_search) != 'undefined')
  {
    var search_string = [];
    search_string.push(bodyreq.category_search.capitalize());
    var catalog_items =[];

    var item_data = await item_info.getBySearch(search_string);

    for(var z=0; z<item_data.length; z++){
      console.log("here")
      var temp = item.item(item_data[z]['item_code'], item_data[z]['item_name'], item_data[z]['catalog_category'], item_data[z]['description'], item_data[z]['rating']) ;
      catalog_items.push(temp);
    }
    res.render('categories.ejs', {category_names:search_string, category_items: catalog_items, sess:req.session.user});
  }

});

//Categories page
router.get('/', function (req, res) {

    var catalog_entry_db = item_info.getItems();
    catalog_entry_db.then( catalog_entry =>{

      var category_names_db = item_info.get_categories();

      category_names_db.then( category_names =>{
        var catalog_items =[];
        for(var z=0; z<catalog_entry.length; z++){

          var temp = item.item(catalog_entry[z]['item_code'], catalog_entry[z]['item_name'], catalog_entry[z]['catalog_category'], catalog_entry[z]['description'], catalog_entry[z]['rating']) ;
          catalog_items.push(temp);

        }

    res.render('categories.ejs', {category_names:category_names, category_items: catalog_items, sess:req.session.user});
    });

  });



});


//Item page
router.get('/item', function (req, res) {

    var qs = req.query;
    try{
      req.session.item_code =qs.item_code;
      item_code = qs.item_code;
      item_data_db = item_info.getItem(item_code);
      item_data_db.then(item_data=>{
      item_data1 = item.item(item_data[0]['item_code'], item_data[0]['item_name'], item_data[0]['catalog_category'], item_data[0]['description'], item_data[0]['rating']);
      res.render('item', {item_data:item_data1, sess:req.session.user});
      })

}
    catch(error){

    res.redirect('/categories');
    }
    }
);

module.exports = router;
