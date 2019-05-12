//Required Pages
var express = require('express');
var fs = require('fs');
var app = express();
var item_model = require('../models/item_schema.js');
var mongoose = require('mongoose');


//Get data from database
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;


//Gets item by ID
var getItem = async function(item_code){

  var resarr =  function(){
    var res =  item_model.find({item_code : item_code});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;
}

//Gets item by ID
var get_categories = async function(){

  var resarr =  function(){
    var res =  item_model.find().distinct('catalog_category');
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;
}



var getItems = async function(){

  var resarr =  function(){
    var res =  item_model.find({});
    return res;
  }

  var itemsA = async function(){
    res = await resarr();
    return res;
  }

  var p = itemsA();
  return p;
}


var getBySearch = async function(search_string){

  var resarr =  function(){
    var res =  item_model.find( {$or: [{catalog_category: search_string}, {item_name: search_string}]});
    return res;
  }



  var itemsA = async function(){
    res = await resarr();
  
    return res;
  }

  var p = itemsA();
  return p;
}

module.exports = {
  getItems : getItems,
  getItem : getItem,
  get_categories: get_categories,
  getBySearch: getBySearch
}
