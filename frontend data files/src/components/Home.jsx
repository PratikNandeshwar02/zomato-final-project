import { useEffect, useState } from "react";
import Header from "./Header";
import { baseUrl } from "./apiUrl";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Home = (props) => {

    const {location} = props;

    const navigate = useNavigate(props);
    
    const [mealType, setMealType] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restId, setRestId] = useState("");
    const [cityId, setCityId] = useState("");

    const getMealType = async () => {
        try{
            let url = baseUrl + "get-mealTypes";
            let {data} = await axios.get(url);
            console.log(data);
            setMealType(data.List_of_MealType);
        }catch(err){
            console.log("found error to get Meal type",err);
        }
    };
  
    let getRestaurantAll = async ()=>{
        try{
            let url = baseUrl + `get-details-of-all-restaurant`;
            let {data} = await axios.get(url);
            console.log(data);
            setRestaurantList(data.Restaurants);
        }catch(err){
            console.log("Found error at getRestaurantAll", err);
        }
    };

    let getRestId = (event) => {
        let rest_id = event.target.value;
        setRestId(rest_id);
    }
    let getCityId = (event) => {
        let city_id = event.target.value;
        setCityId(city_id);
    }

    useEffect(()=> {
        getMealType();
        getRestaurantAll();
    },[]);

    return (
        <main className="container-fluid">
            {/* <!-- header , logo & image section --> */}
            <section className="row main-section">
                {/* <!-- header login button --> */}
                <header className="d-flex justify-content-center">
                    <Header logo={false} user={props.user} />
                </header>
                {/* <!-- section for logo and form --> */}
                <section className="col-12 d-flex flex-column align-items-center justify-content-center">
                <p className="logo">e!</p>
                <p className="h1 text-white my-3 text-center fw-bold"> Find the best restaurants, cafés, and bars</p>
                {/* <!-- form --> */}
                
                <div className="w-50 d-flex mt-3 search">

                    <span className="w-50 input-group me-lg-3">
                        <select className="form-control mb-3 mb-lg-0 py-2 px-3" onChange={getCityId}>
                            <option value="">Select location </option>
                            {
                                location.map((loc,index)=> {
                                    return(
                                        <option key={index} value={loc.city_id} >{loc.name}</option>
                                    )
                                })
                            };
                        </select>
                        {
                            cityId.length === 0 ? null :
                            <span className="btn btn-secondary" onClick={()=>navigate(`search/${cityId}`)}>Search</span>
                        }
                    </span>
                    <span className="w-50 input-group">
                        <i className="fa fa-search text-info input-group-text d-flex justify-content-center"></i>
                        <select name="" id="" className="form-control py-2 px-3" onChange={getRestId}>
                            <option value="">Search for restaurant</option>
                            {
                                restaurantList.map((loc, index)=> {
                                    return(
                                        <option key={index} value={loc._id}>{loc.name}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            restId.length === 0 ? null :
                            <span className="btn btn-secondary" onClick={()=>navigate(`restaurant/${restId}`)}>Search</span>
                        }
                    </span>
                </div>  
                </section>
            </section>

            {/* <!-- quick search meal type section --> */}
            <section className="row justify-content-center">
            {/* <!-- quick search heading --> */}
            <section className="col-10 mt-3">
                <h3 className="text-navy fw-bolder">Quick Searches</h3>
                <p className="text-muted">Discover restaurants by Searches</p>
            </section>

            {/* <!-- section of quick search meal type --> */}
            <section className="col-10">

                <section className="row py-3">
                {/* <!--  display all meal type --> */}
                <section className="col-12 px-3 d-flex justify-content-between flex-wrap">
                    {/* <!-- single meal type --> */}
                    {
                        mealType.map((meal,index)=> {
                            return(
                                <section key={index} value={meal.city_id} className="d-flex justify-content-between quick-search-item"
                                 onClick={()=>navigate(`/search/${meal.meal_type}`)}>

                                    <img src={meal.image} alt="breakfast" className="image-item"/>
                                    <div className="pt-3 px-4">
                                        <h4 className="text-navy fw-semibold">{meal.name}</h4>
                                        <p  className="text-muted">{meal.content}</p>
                                    </div>
                                </section>
                            )
                        })
                    }
                    {/* <!-- single meal type --> */}
                </section>
                </section>
            </section>
            </section>
        </main>
    )
}
export default Home;