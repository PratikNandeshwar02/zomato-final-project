const MenuItemModel = require("../Models/menuItemModel");
const restaurantModel = require(`../Models/restaurantModel`);

module.exports.only__Restaurants_data = async (request, response) => {
    try{ let Restaurants = await restaurantModel.find()
            let sendRestData = { status: Restaurants.length === 0 ? false : true,
                count: Restaurants.length, Restaurants
            }
            response.status(200).send(sendRestData);
        }
    catch { (error)=> {
            let errObj = {status: false, error: error` get to find restaurants data`}
            response.status(500).send(errObj);
        }
    }
} 

module.exports.get__All_Restaurant_by_city_name = async (request, response) => {
    let  { cityName } = request.params;
    try{
        let List_of_Restaurant = await restaurantModel.find({city_name : cityName});
        let sendRestaurantList = {
            status: List_of_Restaurant.length === 0 ? false : true,
            count: List_of_Restaurant.length,
            List_of_Restaurant
        }
        response.status(200).send(sendRestaurantList);
    }
    catch{
        (error) => {
            let errorOBJ = { status: false, error: error `found to get list of restaurant `}
            response.status(500).send(errorOBJ)
        }
    }
}

module.exports.get__All_Restaurant_by_city_id = async (request, response) => {
    let  { city_id } = request.params;
    try{
        let Restaurant = await restaurantModel.find({city : city_id});
        let sendRestaurantList = {
            status: Restaurant.length === 0 ? false : true,
            count: Restaurant.length,
            Restaurant: Restaurant
        }
        response.status(200).send(sendRestaurantList);
    }
    catch{
        (error) => {
            let errorOBJ = { status: false, error: error `found to get list of restaurant `}
            response.status(500).send(errorOBJ)
        }
    }
}

module.exports.get_RestaurantsDetails_by_restaurant_ID = async (request, response) => {
    try{
        let { id } = request.params;
        let Restaurant_details = await restaurantModel.findById(id);
        let sendData = {
            status : Restaurant_details.length === 0 ? false : true,
            Restaurant_details  
        }
        response.status(200).send(sendData);
    }catch(err){
        let errorOBJ = { status: false, error: err + `found to get list of restaurant `}
        response.status(500).send(errorOBJ)
    }
};

module.exports.get_MenuItems_By_Restaurant_Id = async (request, response) => {
    try{
        let { id } = request.params;
        let MenuItems = await MenuItemModel.find(  {restaurantId: id} );
        let sendData = {
            status: MenuItems.length === 0 ? false : true,
            count : MenuItems.length,
            MenuItems
        }
        response.status(200).send(sendData);
    }catch(err){
        response.status(400).send("found error at get_MenuItems_By_Restaurant_Id", err)
    }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

module.exports.filter_for_options = async (request, response) => {
    try {
        let {
            mealType,
            cuisine,
            city_id,
            city,
            low_cost, high_cost,
            sort,
            page
        } = request.body;

        console.log({
            mealType,
            cuisine,
            city_id,
            city,
            low_cost, high_cost,
            sort,
            page
        });

        let filter= {}; // get all data
        page ? page : 1;
        sort ? sort : 1;

        if(mealType !== undefined){
            filter[`type.mealtype`] = mealType;
        };
        if(cuisine !== undefined){
            filter[`Cuisine.cuisine`] = cuisine;
        };
        if(city_id !== undefined){
            filter[`city`] = city_id;
        };
        if(city !== undefined){
            filter[`city_name`] = city;
        };
        if(low_cost !== undefined && high_cost !== undefined){
            filter[`cost`] = {$gte: low_cost, $lte: high_cost};
        };

        const itemsPerPage = 2;
        let startIndex = itemsPerPage*page - itemsPerPage;
        let endIndex = itemsPerPage*page;

        let Restaurant_List = await restaurantModel.find(filter).sort({cost : sort});
        let send_Restaurant = {
            status : Restaurant_List.length === 0 ? false : true,
            "Total Restaurant" : Restaurant_List.length,
            Restaurant_List : Restaurant_List
            // .slice(startIndex, endIndex)
        }
        response.status(200).send(send_Restaurant);
    }
    catch(err) {
        let errObj = { status : false, error : err + ` <== this error found to get Restaurant by this filter option` };
        response.status(500).send(errObj);
    }
}