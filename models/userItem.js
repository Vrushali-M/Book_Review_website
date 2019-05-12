//Creates an user item model to be used in ejs files

var user_item_1 = require('../controller/data_utility.js');

var user_item = async function(item_code, my_rating, read_it, review){
var item_data = await user_item_1.getItem(item_code);
var getImageURL = function(item_code){
    return '../assets/images/'+item_code+'.jpg';
  };

var userItemModel = {item_code:item_code,
                    item_name: item_data[0]['item_name'],
                    catalog_category: item_data[0].catalog_category,
                    description: item_data[0].description,
                    rating: item_data[0].rating,
                    my_rating:my_rating,
                    read_it: read_it,
                    review: review,
                    get_image_url: getImageURL(item_code)
                    };

return userItemModel;
};

module.exports.user_item = user_item;
