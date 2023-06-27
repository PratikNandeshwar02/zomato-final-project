const mongoose = require(`mongoose`);

const RestaurantSchema = new mongoose.Schema({
    name: { type : String },
    city_name: { type : String },
    city: { type : String },
    area: { type : String },
    locality: { type : String },
    thumb: { type : Array },
    cost: { type : Number },
    address: { type : String },
    type: [{
        mealtype : {type : String},
        name : {type : String}
    }],
    Cuisine: [{
        cuisine : {type : String},
        name : {type : String}
    }]
    
});

const restaurantModel = mongoose.model(`restaurant`, RestaurantSchema, `restaurants`);

module.exports = restaurantModel;