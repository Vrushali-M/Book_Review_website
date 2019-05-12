var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/all_about_books', { useNewUrlParser: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});



//Create Schema for Items
var user_schema = new mongoose.Schema({
    user_id: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name:String,
    email_id:String,
    add_line_1:String,
    add_line_2:String,
    city:String,
    state:String,
    zip_code: String,
    country: String,
    phone: String,
    password: String
});


var item_model = mongoose.model('user', user_schema, 'user' );

module.exports = mongoose.model('user', user_schema, 'user' );
