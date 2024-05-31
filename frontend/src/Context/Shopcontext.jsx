import {React, createContext,  useCallback,  useEffect,  useState } from "react"
import axios from "axios"

const Shopcontext = createContext()

const ShopcontextProvider=({children})=>{

  const allproducts=()=>{
    fetch(`${process.env.REACT_APP_API_URL}/product`)
    .then((response) => response.json())
    .then((data) => {
        setProducts(data)
    })
    .catch(err=>setError(err))
  }  

  useEffect(()=>{
    allproducts()
  },[])



  const [products,setProducts] = useState([])
  const [product,setProduct] = useState()
  const [error,setError] = useState()
  const [id,setId] = useState()
  const [reviews,setReviews] = useState()  
  const [success,setSuccess] = useState(false)

  useEffect(()=>{
    allproducts()
  },[products])
 
  const singleproduct = useCallback((ID) => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${ID}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => setError(err));
  }, []);   

  const addproduct= async(formData)=>{
    try{
      const config = { headers: { 'Content-Type': 'multipart/form-data' },withCredentials :true };
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/product/new`,formData,config);
      alert('product added')    
    }
    catch(err){
      setError(err)
      alert('product addition failed')
    
    }
  }

  const updateproduct= async(id,formData)=>{
    try{
      const config = { headers: { 'Content-Type': 'multipart/form-data' },withCredentials :true };
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/product/${id}`,formData,config);
      allproducts()

      alert('product updated')
    
    }
    catch(err){
      setError(err)
      alert('product upgradation failed')
    
    }
  }

  const deleteproduct= async(id)=>{
    try{
      axios.delete(`${process.env.REACT_APP_API_URL}/admin/product/${id}`,{withCredentials :true})
      alert('product deleted')
    }
    catch(err){
      alert('product deletion failed')
      setError(err)
    }
  }

  const addproductreview = async(review)=>{
    try{
      const config = { headers: { "Content-Type": "application/json" },withCredentials :true };
      await axios.put(`${process.env.REACT_APP_API_URL}/review`,review,config);
      alert('product review added')
      allproducts()
    }
    catch(err){
      alert('product review addition failed')
      setError(err)
    }

  }


  const getproductreview = async(id)=>{
    try{
      const config = { headers: { "Content-Type": "application/json" },withCredentials :true };

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/review`,id,config);
      setSuccess(true)
      setReviews(data)
    }
    catch(err){
      alert('unable to get product review')
      setError(err)
    }

  }

  return(
    < Shopcontext.Provider value={{products,setProducts,id,setId,product,setProduct,singleproduct,deleteproduct,addproductreview,addproduct,updateproduct,getproductreview,reviews,success,error}}>
        {children}
    </ Shopcontext.Provider>
  )
}



export {Shopcontext,ShopcontextProvider}