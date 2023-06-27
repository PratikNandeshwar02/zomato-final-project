import axios from "axios";
import Header from "./Header";
import Pagination from "./Pagination";
import SearchResult from "./SearchResult";
import { baseUrl } from "./apiUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Filter = (props) => {

    let {location} = props
    const {meal_id} = useParams();
    console.log(meal_id);

    const [filterOption, setFilterOptions] = useState({mealType:meal_id, sort: 1});
    const [restaurantList, setRestaurantList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(2);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;

    let currentRestaurantList = restaurantList.slice(firstIndex, lastIndex);

    const getFilterData = async () => {
        try{
            let url = baseUrl + "filter-options";
            let {data} = await axios.post(url, filterOption);
            console.log(data);
            setRestaurantList(data.Restaurant_List);
        }catch(err){
            console.log("found error to get Filter data",err);
        }
    }

    const setFilter = (event) => {
        let {name, value} = event.target;
        console.log("Changed",name,value);
        let costRange = value.split("-");
        console.log(costRange);
        let lowCost = costRange[0];
        let highCost = costRange[1];
        switch(name){
            case "sort": setFilterOptions({...filterOption, sort: Number(value)});
            break;
            case "cost": setFilterOptions({...filterOption, low_cost: lowCost, high_cost: highCost});   
            break;
            case "cuisine": setFilterOptions({...filterOption, cuisine: Number(value)});
            break;
            case "cityLocation": setFilterOptions({...filterOption, city_id: Number(value)});
            break;
        }
    }

    useEffect(()=> {
        getFilterData();
    },[filterOption])

    return (
        <div className="container-fluid">
        <div className="row justify-content-center h-auto">
             {/* <!-- header logo & button --> */}
             <header className="bg-danger d-flex justify-content-center">
                <Header user={props.user}/>
            </header>

            <div className="pt-4 col-12 col-lg-10">

                <p className="text-navy place-heading h3 m-2">Breakfast Places in Mumbai</p>
            </div>

            <div className="row justify-content-start col-lg-10 col-12 gap-5 mb-5">
            {/* <!-- filter pop up parent --> */}
                <div className="col-12 col-lg-3 p-lg-4 p-1 px-3 mb-1 filter-pop-up-parent">
                        {/* <!-- collapse heading --> */}
                        <div className="text-navy fw-bold mb-0 d-lg-none d-flex justify-content-between align-content-center"
                            data-bs-toggle="collapse" data-bs-target="#collapseFilter">
                            <span className="mt-2">Filters / Sort</span>
                            <button className="d-lg-none d-md-none btn"><i className="fa fa-angle-down" aria-hidden="true"></i></button>
                        </div>
                    {/* <!-- filter pop up child --> */}
                        {/* <!-- collapse section start --> */}
                        <section id="collapseFilter" className="collapse d-lg-block filter-pop-up">
                                <p className="text-navy fw-bold fs-5">Filters</p>
                            <hr className="m-2"/>
                            {/* <!-- filter options start --> */}
                            {/* <!-- Select Location --> */}
                            <div className="mb-3">
                                <label htmlFor="" className="text-navy form-label">Select Location</label>

                                <select name="cityLocation" onChange={setFilter} className="px-3 py2 w-100 text-muted form-select-sm cursor my-1">
                                    <option> select location </option>
                                    {location.map((loc,index)=> {
                                        return(
                                            <option key={index} value={loc.city_id}>{loc.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <hr className="m-2"/>
                            {/* <!-- Cuisine  --> */}
                            <div className="mb-3">
                                <p className="text-navy ">Cuisine</p>
                                <div>
                                    <input name="cuisine" value={1} onClick={setFilter} type="checkbox" className="form-check-input text-navy mx-3 cursor my-1" id="c1"/>
                                    <label htmlFor="c1" className="form-check-label text-muted cursor">North Indian</label></div>
                                <div>
                                    <input name="cuisine" value={2} onClick={setFilter} type="checkbox" className="form-check-input text-navy mx-3 cursor my-1" id="c2"/>
                                    <label htmlFor="c2" className="form-check-label text-muted cursor">South Indian</label></div>
                                <div>
                                    <input name="cuisine" value={3} onClick={setFilter} type="checkbox" className="form-check-input text-navy mx-3 cursor my-1" id="c3"/>
                                    <label htmlFor="c3" className="form-check-label text-muted cursor">Chinese</label></div>
                                <div>
                                    <input name="cuisine" value={4} onClick={setFilter} type="checkbox" className="form-check-input text-navy mx-3 cursor my-1" id="c4"/>
                                    <label htmlFor="c4" className="form-check-label text-muted cursor">Fast Food</label></div>
                                <div>
                                    <input  name="cuisine" value={5} onClick={setFilter}type="checkbox" className="form-check-input text-navy mx-3 cursor my-1" id="c5"/>
                                    <label htmlFor="c5" className="form-check-label text-muted cursor">Street Food</label></div>
                            </div>
                            <hr className="m-2"/>
                            {/* <!-- Cost for two --> */}
                            <div className="mb-3">
                                <p className="text-navy">Cost For Two</p>
                                <div>
                                    <input name="cost" value={"0-500"} onChange={setFilter} type="radio" id="r1" className="mx-3 cursor my-1"/>
                                    <label htmlFor="r1" className="cursor text-muted">Less than ` 500</label></div>
                                <div>
                                    <input name="cost" value={"500-1000"} onChange={setFilter} type="radio" id="r2" className="mx-3 cursor my-1"/>
                                    <label htmlFor="r2" className="cursor text-muted">` 500 to ` 1000</label></div>
                                <div>
                                    <input name="cost" value={"1000-1500"} onChange={setFilter} type="radio" id="r3" className="mx-3 cursor my-1"/>
                                    <label htmlFor="r3" className="cursor text-muted">` 1000 to ` 1500</label></div>
                                <div>
                                    <input name="cost" value={"1500-2000"} onChange={setFilter} type="radio" id="r4" className="mx-3 cursor my-1"/>
                                    <label htmlFor="r4" className="cursor text-muted">` 1500 to ` 2000</label></div>
                                <div>
                                    <input name="cost" value={"2000-99999"} onChange={setFilter} type="radio" id="r5" className="mx-3 cursor my-1"/>
                                    <label htmlFor="r5" className="cursor text-muted">` 2000+</label></div>
                            </div>
                            <hr className="m-2"/>
                            {/* <!-- Sort --> */}
                            <div>
                                <p className="text-navy fw-semibold">Sort</p>
                                <div>
                                    <input name="sort" value={1} onChange={setFilter} type="radio" id="s1" className="mx-3 cursor my-1"/>
                                    <label htmlFor="s1" className="cursor text-muted">Price low to high</label></div>
                                <div>
                                    <input name="sort" value={-1} onChange={setFilter} type="radio" id="s2" className="mx-3 cursor my-1"/>
                                    <label htmlFor="s2" className="cursor text-muted">Price high to low</label></div>
                            </div>
                            <hr/>
                            {/* <!-- Apply button --> */}
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn btn-primary d-lg-none d-block">Apply Filter</button>
                            </div>
                        </section>  
                        {/* <!-- collapse section end --> */}
                </div>
                
                {/* search result component */}   
                    <SearchResult
                        restaurantList={currentRestaurantList}
                    />
                    
                    <Pagination
                        totalRestaurant={restaurantList.length}
                        restaurantPerPage={perPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                {/* search result component */}
            </div>
        </div>
    </div>
    )
}
export default Filter;