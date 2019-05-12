//Required Pages
var express = require('express');
var fs = require('fs');
var app = express();
var user_item_model = require('../models/useritem_schema.js');
var user_model = require('../models/user_schema.js')
var mongoose = require('mongoose');

//Get data from database
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;



var getUsers = async function(){

  var resarr =  function(){
    var res =  user_model.find({});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;

}


//
var getProfileData = async function(user_id){

  var resarr =  function(){
    var res =  user_item_model.find({user_id: user_id});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;

}


//
var addItem = async function(item_code, user_id, my_rating=0, read_it="No", is_deleted = false){

      //Updates if item is added
		   if(1)
      {

       await user_item_model.deleteOne({item_code: item_code, user_id : user_id}, function(err, obj) {
         if (err) throw err;
       });
       var newitem = await new user_item_model({ item_code: item_code , user_id:user_id, my_rating:my_rating, read_it:read_it, is_deleted:is_deleted }).save();

  };

};

// Deleting Items
var removeItem = async function(item_code, user_id){


       user_item_model.deleteOne({item_code: item_code, user_id:user_id}, function(err, obj) {
         if (err) throw err;
       });



}

var emptyProfile = async function(userid){

      {
       user_item_model.deleteMany({user_id: user_id}, function(err, obj) {
         if (err) throw err;
       });

  };

}
var updateItem = async function(item_code, user_id, my_rating=0, read_it="No", is_deleted = false){

    if(read_it ==''){
      read_it = 'No';
    }
    if(my_rating ==''){
      my_rating = 0;
    }
    addItem(item_code, user_id, my_rating, read_it, is_deleted);

  };







module.exports = {
  getUsers : getUsers,
  getProfileData : getProfileData,
  addItem: addItem,
  removeItem: removeItem,
  emptyProfile: emptyProfile,
  updateItem: updateItem
}
