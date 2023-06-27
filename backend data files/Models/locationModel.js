const mongoose = require(`mongoose`);

const locationSchema = new mongoose.Schema({
    _id : { type: String},
    name: { type: String},
    city_id: { type: String},
    location_id: { type: String},
    country_name: { type: String},
})

const locationModel = mongoose.model(`location`, locationSchema, `locationsAll`);

module.exports = locationModel;