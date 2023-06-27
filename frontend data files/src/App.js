import { Route, Routes } from "react-router-dom";
import Filter from "./components/Filter";
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";

import {baseUrl} from '../src/components/apiUrl'
import { useEffect, useState } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";


const App = () => {

  let getUserDetails = () => {
    // check wether the use is login
    // 1 get data from local storage have method 
    let token = localStorage.getItem("zomato_oauth_token");
    if (token === null){
      return null
    }else{
      try{
        let data = jwt_decode(token); // to store in database we collect from here
        return data;
      }catch(err){
          return null;
      }
    }
  }

  let [user, setUser] = useState(getUserDetails());

  const [location, setLocation] = useState([]);
  const locationList = async () => {
    try{
        let url = baseUrl + "get-all-locations";
        let {data} = await axios.get(url);
        console.log(data);
        setLocation(data.List_of_Location)
    }catch(err){
        console.log("got error to found location list",err);
    }
  }

  useEffect(()=> {  
      locationList();
      console.log(user);
  },[])

  return (
      <>
          {/* <h3>Hello , App</h3> */}
        <Routes>
          
          <Route path="/" element={ <Home  location={location} user={user}/>} />
         
          <Route path="/search/:meal_id" element={ <Filter location={location} user={user}/>}/>

          <Route path="/restaurant/:restaurant_id" element={ <Restaurant user={user}/> }/>
          
        </Routes>
      </>
  );
};
export default App;