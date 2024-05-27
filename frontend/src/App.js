import {React, useEffect, useState } from "react";
import { useContext } from "react";
import axios from "axios";

import { BrowserRouter , Route,Routes} from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Layout from "./component/Layout/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login"
import Cart from "./pages/Cart";
import Protected from "./component/Protected/Protected";
import Shipping from "./component/Shipping/Shipping";
import Confirmorder from './component/Confirmorder/Confirmorder'
import Payment from "./component/Payment/Payment";
import Ordersuccess from "./component/Ordersuccess/Ordersuccess";
import Myorder from "./component/Myorder/Myorder";
import Orderdetails from "./component/Orderdetail/Orderdetails";
import Dashboard from "./component/Dashboard/Dashboard";
import Allproducts from "./component/Adminproducts/Allproducts";
import Addproduct from "./component/Addproduct/Addproduct";
import Allorders from "./component/Adminorders/Allorders";
import Editorder from "./component/Editorder/Editorder";
import Allusers from "./component/Adminusers/Allusers";
import Edituser from "./component/Edituser/Edituser";
import Notfound from "./component/Notfound/Notfound";
import Protectedadmin from "./component/Protectedadmin/Protectedadmin";

import { Usercontext } from "./Context/Usercontext";
import Editproduct from "./component/Editproduct/Editproduct";
import Areviews from "./component/Adminreviews/AReviews";

function App() {
  const {setUser} = useContext(Usercontext) 
  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("http://localhost:4000/stripeapikey",{withCredentials :true});
      setStripeApiKey(data.stripeApiKey);
      // console.log(stripeApiKey)
    } catch (err) {
      const error = err.response
    }
  }

  useEffect(() => {
    getStripeApiKey();   
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/me`,{withCredentials :true});
        setUser(data.user);
      } catch (err) {
        const error = err.response        
      }
    };

    fetchUser();
  }, [setUser]);
 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element={<Home/>}/>
            <Route path='/men' element={<Category Pcategory={"men"}/>}/>
            {/* </Route> */}
            <Route path='/women' element={<Category Pcategory={"women"}/>}/>
            <Route path='/kids' element={<Category Pcategory={"kid"}/>}/>
            <Route path='men/:id' element={<Product/>}/>
            <Route path='women/:id' element={<Product/>}/>
            <Route path='kid/:id' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route element={<Protected/>}>
  
              
              <Route path='/shipping' element={<Shipping/>}/>
              <Route path='/order/confirm' element={<Confirmorder/>}/>

              {stripeApiKey && (
                <Route path="/process/payment" element={(<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)}/>
              )} 
              <Route path='/order/success' element={<Ordersuccess/>}/>
              <Route path='/order/my' element={<Myorder/>}/>
              <Route path='/order/:id' element={<Orderdetails/>}/>
              <Route element={<Protectedadmin/>}>
                <Route path='/admin/dashboard' element={<Dashboard/>}/>            
                <Route path='/admin/product/all' element={<Allproducts/>}/>            
                <Route path='/admin/product/create' element={<Addproduct/>}/>
                <Route path='/admin/product/:id' element={<Editproduct/>}/>            

                <Route path='/admin/order/all' element={<Allorders/>}/>            
                <Route path='/admin/order/:id' element={<Editorder/>}/>            
                <Route path='/admin/user' element={<Allusers/>}/>
                <Route path='/admin/user/:id' element={<Edituser/>}/>            
                <Route path='/admin/reviews' element={<Areviews/>}/>            
              </Route>
            </Route>
            <Route path='*' element={<Notfound/>}/> 

          </Route>
        </Routes>
      </BrowserRouter>

    
    </>
  
  );
}

export default App;
