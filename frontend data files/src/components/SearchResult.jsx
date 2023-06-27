import { useNavigate } from "react-router-dom";

const SearchResult = (props) => {

    let navigate = useNavigate();

    let {restaurantList} = props;
 
    return (
        <div className="col-12 col-lg-8">
            {

                restaurantList.length === 0 ?
                <>
                    <div 
                        className=" d-flex justify-content-center align-items-center box-shadow  fs-2 fw-bold h-75 ">
                            Sorry, No restaurant found
                    </div>
                </>
                :

                restaurantList.map((restaurant, index)=> {
                    return (
                        <div key={index} className="cursor box-shadow p-lg-4 p-2 mb-lg-4 mb-2 " onClick={()=>navigate(`/restaurant/${restaurant._id}`)}>

                                    <section className="d-flex align-items-center">
                                        <img src={restaurant.image} alt="" className="food-item"/>
                                        <article className="ms-lg-4 ms-3">
                                            <p className="text-navy h4 fw-bold mb-lg-1 mb-0">{restaurant.name}</p>
                                            <span className="fw-bold text-navy">Fort</span>
                                            <p className="m-0 text-muted form-select-sm">
                                                <span><i className="fa fa-map-marker text-danger me-2" aria-hidden="true"></i></span>
                                                <span>{restaurant.locality}</span>
                                            </p>
                                        </article>
                                    </section>
                                <hr className="mt-3  mb-1 mb-lg-3"/>
                                    <section className="d-flex gap-5">
                                        <div>
                                            <p className="text-muted m-1">CUISINE :</p>
                                            <p className="text-muted m-1">MIN PRICE :</p>
                                        </div>
                                        <div>
                                            <p className="text-navy m-1">
                                                {restaurant.Cuisine ? 
                                                    restaurant.Cuisine.map((item)=>{ 
                                                        return item.name
                                                        }
                                                    ).join(",") : null
                                                }
                                            </p>
                                            <p className="text-navy m-1"><i className="fa fa-inr" aria-hidden="true"></i><span>{restaurant.cost}</span>/-</p>
                                        </div>
                                    </section>
                
                            </div> 
                        )
                    }
                )
            }
        </div>
    );
};
export default SearchResult;