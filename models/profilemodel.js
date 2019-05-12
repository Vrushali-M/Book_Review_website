//Creates an profile model to be used in ejs files
var profilemodel = function(items){

  var getImageURL = function(item_code){
    return '../assets/images/'+item_code+'.jpg';
  };
var profileModel = {item_code:items.item_code,
                    item_name:items.item_name,
                    catalog_category: items.catalog_category,
                    my_rating: items.my_rating,
                    rating: items.rating,
                    read_it:items.read_it,
                    get_image_url: items.get_image_url};
return profileModel;
};

module.exports.profilemodel = profilemodel;
