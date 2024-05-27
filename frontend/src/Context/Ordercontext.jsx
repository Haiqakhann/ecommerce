import { createContext, useCallback, useContext,  useState } from "react"
import axios from "axios";

import { Cartcontext } from "./Cartcontext";

const Ordercontext = createContext()


const OrdercontextProvider=({children})=>{

    const {clearCart} =useContext(Cartcontext)

    const [order,setOrder] =useState()
    const [allorder,setAllorder] =useState()
    const [totalA,setTotalA] = useState()
    const [error,setError] =useState()

    const orderCreate = async(order) =>{
        try {
            const config = { headers: { "Content-Type": "application/json" } ,withCredentials :true };

            const { data } = await axios.post(`http://localhost:4000/order/new`,order,config);
            setOrder(data.order)
            clearCart()
            alert('order placed')
        } 
        catch (err) {
            setError(err.response.data.message)
            alert('order failed')
        
        }
    }

     
  const singleorder = useCallback((ID) => {
    axios.get(`http://localhost:4000/order/${ID}`,{withCredentials :true})
      .then((data) => {
        setOrder(data.data.order);
    })
      .catch((err) => setError(err));
  }, []);   



    const deleteorder= async(id)=>{
        try{
            axios.delete(`http://localhost:4000/admin/order/${id}`,{withCredentials :true})
            alert('order deleted')
            getallorder()
        }
        catch(err){
            alert('order deletion failed')
    
          setError(err.response.data.message)
        }
    }


    const updateorder= async(id,status)=>{
        try{
            const config = { headers: { "Content-Type": "application/json" },withCredentials :true };
            const { data } = await axios.post(`http://localhost:4000/admin/order/${id.id}`,status,config);
            alert('order status updated')
        }
        catch(err){
            alert('order status upgradation failed')
    
          setError(err.response.data.message)
        }
    }
    
    const getallorder = useCallback(() => {
        axios.get(`http://localhost:4000/admin/orders`,{
            withCredentials :true})
            .then((data) => {
                setAllorder(data.data.order)
                setTotalA(data.data.totalAmount)
            })
            .catch((err)=>{
                setError(err.response.data.message)
            })
      }, []);   

    return(
      < Ordercontext.Provider value={{orderCreate,allorder,totalA,deleteorder,updateorder,singleorder,order,getallorder}}>
          {children}
      </ Ordercontext.Provider>
    )
}



export {Ordercontext,OrdercontextProvider} 
