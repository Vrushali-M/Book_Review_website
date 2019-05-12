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



var getUsers = async function(item_code){

  var resarr =  function(){
    var res =  user_model.find();
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;

};

var getUserProfiles = async function(user_id){

  var resarr =  function(){
    var res =  user_model.find({user_id: user_id});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;

};

var getUser = async function(email_id){

  var resarr =  function(){
    var res =  user_model.find({email_id: email_id});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = await itemsA();
  return p;

};


module.exports = {
  getUsers : getUsers,
  getUserProfiles : getUserProfiles,
  getUser: getUser

}
