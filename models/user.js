//Creates an user model 
var user = function(user_id, first_name, last_name, email_id, add_line_1='', add_line_2='', city='', state='', zip_code='', country='', phone_no=''){

var userModel = {user_id:user_id,
                    first_name:first_name,
                    last_name: last_name,
                    email_id: email_id,
                    add_line_1: add_line_1,
                    add_line_2: add_line_2,
                    city: city,
                    state: state,
                    zip_code: zip_code,
                    country: country,
                    phone_no: phone_no
                  };
return userModel;
};

module.exports.item = user;
