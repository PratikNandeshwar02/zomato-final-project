
const locationController = require(`../Controllers/locationController`);

const restaurantController = require(`../Controllers/restaurantController`);

const mealtypeController = require(`../Controllers/mealtypeController`);

const { genOrderDetails, verifyPaymentDetails } = require("../Controllers/paymentController");


const ApiRoute = require(`express`).Router();


ApiRoute.get(`/api/`, locationController.Homepage);

ApiRoute.get(`/api/get-all-locations`, locationController.get_all_location_of_restaurant);

ApiRoute.get(`/api/get-details-of-all-restaurant`, restaurantController.only__Restaurants_data)


ApiRoute.get(`/api/get-restaurant-by/:cityName`, restaurantController.get__All_Restaurant_by_city_name);

ApiRoute.get(`/api/get-restaurant/:city_id`, restaurantController.get__All_Restaurant_by_city_id);

ApiRoute.get('/api/get-restaurant-details-by-rest-id/:id', restaurantController.get_RestaurantsDetails_by_restaurant_ID);


ApiRoute.get('/api/get-menu-item-by-restaurant-id/:id', restaurantController.get_MenuItems_By_Restaurant_Id);


ApiRoute.get(`/api/get-mealTypes`, mealtypeController.get_all_types_of_meal);

ApiRoute.get(`/api/get-cuisine-type`, mealtypeController.get_all_types_of_cuisine);


ApiRoute.post(`/api/filter-options`, restaurantController.filter_for_options)


// payment
ApiRoute.post("/api/generate-order-detail",genOrderDetails);

ApiRoute.post("/api/verify-payment-detail",verifyPaymentDetails);

module.exports = ApiRoute;