import { useParams } from "react-router-dom";
import Header from "./Header";
import { baseUrl } from "./apiUrl";
import axios from 'axios'
import { useEffect, useState } from "react";

import ModalSlideShow from "./ModalSlideShow";
import ModalMenuItem from "./ModalMenuItem";

const Restaurant = (props) => {



    let {restaurant_id} = useParams();
    console.log(restaurant_id);

    const [restaurant, setRestaurant] = useState([]);
    const getRestaurantDetails = async () => {
       try{
            let url = baseUrl + "get-restaurant-details-by-rest-id/" +  restaurant_id;
            let {data} = await axios.get(url);
            console.log(data);
            setRestaurant(data.Restaurant_details)
       }catch(err){
            console.log("found error to get details of restaurants", err);
       }
    };

    useEffect(()=> {
        getRestaurantDetails();
    },[])  

    return (  
        <main className="container-fluid">
            <div className="row justify-content-center h-auto">
                {/* <!-- header logo & button --> */}
                <header className="bg-danger d-flex justify-content-center">
                    <Header user={props.user}/>
                </header>
                <section className="col-lg-10 mb-5 col-12">
                    <div className="row mb-5">
                        {/* <!-- image gallery --> */}
                        <div className="col-12 mt-lg-5 mt-4 mb-4 mb-lg-5 restaurant-menu-gallery position-relative">
                            <img src={restaurant.image} alt="" className="img-fluid"/>
                            <button className="position-absolute btn btn-outline-light btn-gallery"
                                data-bs-target="#RestMenuSlideShow" data-bs-toggle="modal" 
                                >Click to see Image Gallery</button>
                                <ModalSlideShow restaurant={restaurant}/>
                        </div>
                        {/* <!-- restaurant heading --> */}
                        <div className="col-12">
                            <div className="d-flex align-items-center mb-4 mt-4 ms-4">
                                <img src={restaurant.image} alt="" className="menu-item d-lg-none d-md-none"/>
                                <h4 className="place-heading mb-lg-5 mb-0">{restaurant.name}</h4>
                            </div>
                            {/* <!-- nav and div of tav-content --> */}
                            <nav>
                                <div className="nav nav-underline d-flex justify-content-between">
                                    <div className="d-flex">
                                        <button
                                            type="button" role="tab"
                                            className="nav-link active text-danger" id="nav-overview-tab"
                                            data-bs-toggle="tab" data-bs-target="#nav-overview"
                                            aria-controls="nav-overview" aria-selected="true"
                                        >
                                        <span>
                                            <span className="text-navy px-2">Overview</span>
                                        </span>
                                        </button>
                                        <button
                                            type="button" role="tab"
                                            className="nav-link text-danger" id="nav-contact-tab"
                                            data-bs-toggle="tab" data-bs-target="#nav-Contact"
                                            aria-controls="nav-Contact" aria-selected="false"
                                        >
                                            <span>
                                                <span className="text-navy px-2">Contact</span>
                                            </span>
                                        </button>
                                    </div>
                                    <span><ModalMenuItem restaurant={restaurant} user={props.user}/></span>
                                </div>
                                <hr className="mt-0"/>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div 
                                    className="tab-pane fade show active" id="nav-overview"
                                    role="tabpanel" aria-labelledby="nav-overview-tab"
                                    tabIndex="-1"
                                >
                                    <p className="place-heading h5 mb-5 mt-5">About this place</p>
                                    <p className="text-navy fw-bold mb-2">Cuisine</p>
                                    <p className="text-navy mb-4">
                                        {restaurant.Cuisine ? 
                                            restaurant.Cuisine.map((item)=>{
                                                return item.name
                                            }).join(" , ") : null
                                        }
                                    </p>
                                    <p className="text-navy fw-bold mb-2">Average Cost</p>
                                    <p className="text-navy">₹{restaurant.cost} for two people (approx.)</p>
                                </div>
                                <div 
                                    className="tab-pane fade" id="nav-Contact"
                                    role="tabpanel" aria-labelledby="nav-contact-tab"
                                    tabIndex="-1"
                                >
                                <p className="text-navy mb-2 mt-5">Phone Number</p>
                                <p className="text-navy text-danger mb-5">
                                    <span className="text-navy text-danger">{restaurant.contact_number}</span>
                                </p>
                                <p className="text-navy fw-bold mb-2 mt-5">{restaurant.name}</p>
                                <p>
                                    <span className="px-2 text-navy">{restaurant.locality}, {restaurant.address}</span>
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    </main>
    )
}
export default Restaurant;