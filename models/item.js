//Creates an item model to be used in ejs files
var item = function(item_code, item_name, catalog_category, description, rating){
var getImageURL = function(item_code){
  return '../assets/images/'+item_code+'.jpg';
};
var itemModel = {item_code:item_code,
                    item_name:item_name,
                    catalog_category: catalog_category,
                    description: description,
                    rating: rating,
                    get_image_url: getImageURL(item_code)};
return itemModel;
};

module.exports.item = item;
