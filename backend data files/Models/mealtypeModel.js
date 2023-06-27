const mongoose = require(`mongoose`);

const MealtypeSchema = new mongoose.Schema({
    name : { type : String},
    content : { type : String},
    image : { type : String},
    meal_type : { type : String}
});

const mealtypeModel = mongoose.model(`mealtype`, MealtypeSchema, `mealTypes`);

module.exports = mealtypeModel;