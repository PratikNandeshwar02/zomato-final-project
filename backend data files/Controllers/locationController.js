const locationModel = require(`../Models/locationModel`)

module.exports.Homepage = (request, response) => {
    response.send(`Welcome to HomePage of ZOMATO API`)
}

module.exports.get_all_location_of_restaurant = async (request, response) => {
    try{
        let List_of_Location = await locationModel.find();
        let sendLocationList = {
            status: List_of_Location.length === 0 ? false : true,
            count: List_of_Location.length,
            List_of_Location
        }
        response.status(200).send(sendLocationList);
    }
    catch{
        (error) => {
            let errorOBJ = { status: false, error: error `found at get Location List`}
            response.status(500).send(errorOBJ);
        }
    }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //