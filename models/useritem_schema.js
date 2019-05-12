var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});



//Create Schema for Items
var useritem_schema = new mongoose.Schema({
    user_id: {type: String, required: true},
    item_code: {type: String, required: true},
    my_rating:String,
    read_it:String,
    is_deleted: Boolean
});


var useritem_model = mongoose.model('userItem', useritem_schema, 'userItem' );

module.exports = mongoose.model('userItem', useritem_schema, 'userItem' );
