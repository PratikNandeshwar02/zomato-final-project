const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const MenuItemSchema = new mongoose.Schema(
    {
        name: {type: String},
        description: {type: String},
        ingridients: {type: Array},
        restaurantId: {type: ObjectId},
        image: {type: String},
        qty: {type: Number},
        price: {type: Number}
    }
);

const MenuItemModel = mongoose.model('menuItem', MenuItemSchema, "menuItems");

module.exports = MenuItemModel;