var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});



//Create Schema for Items
var item_schema = new mongoose.Schema({
    item_code: {type: String, required: true},
    item_name: {type: String, required: true},
    catalog_category:String,
    description:String,
    rating: String
});


var item_model = mongoose.model('items', item_schema, 'items' );

module.exports = mongoose.model('items', item_schema, 'items' );
