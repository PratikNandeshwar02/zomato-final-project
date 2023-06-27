const mealtypeModel = require(`../Models/mealtypeModel`);
const restaurantModel = require(`../Models/restaurantModel`)

module.exports.get_all_types_of_meal = async (request, response) => {
    try {
        let List_of_MealType = await mealtypeModel.find();
        let sendMealType = {
            status: List_of_MealType.length === 0 ? false : true,
            count : List_of_MealType.length,
            List_of_MealType
        }
        response.status(200).send(sendMealType);
    }
    catch {
        (error) => {
            let errorOBJ = { status: false, error: error `found to get list of meal type `}
            response.status(500).send(errorOBJ);
        }
    }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

module.exports.get_all_types_of_cuisine = async (request, response) => {
    try {
        let filter= {};
        let projection = { Cuisine:1, };
        let List_of_Cuisine = await restaurantModel.find( filter, projection );
        let sendMealType = {
            status: List_of_Cuisine.length === 0 ? false : true,
            count : List_of_Cuisine.length,
            List_of_Cuisine
        }
        response.status(200).send(sendMealType);
    }
    catch {
        (error) => {
            let errorOBJ = { status: false, error: error `found to get list of meal type `}
            response.status(500).send(errorOBJ);
        }
    }
}