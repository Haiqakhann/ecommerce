import { createContext,  useEffect,  useState } from "react"

const Cartcontext = createContext()

const CartcontextProvider = ({children})=>{


    const [cartitems,setCartitems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    const [shipping,setShipping] = useState(localStorage.getItem('shippingdetails') ? JSON.parse(localStorage.getItem('shippingdetails')) : {
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:"",
        phoneNo:""
    })
    
    const itemsincart = cartitems.length

    const addtocart = (item)=>{

        const inCart = cartitems.filter(((cartitem)=>cartitem.product === item.product && cartitem.size === item.size))[0]
        if(inCart){
            return setCartitems(cartitems.map((cartitem) =>
                cartitem.product === item.product && cartitem.size === item.size
                  ? { ...cartitem, quantity:item.quantity }
                  : cartitem))
        
         }    
        else{
            setCartitems(
                [...cartitems,item]
            )
        }


    }

    const removefromcart = (item)=>{
        const inCart = cartitems.filter(((cartitem)=>cartitem.product !== item.product || cartitem.size !== item.size))
        
        setCartitems(
            [
                ...inCart
            ]
        )
        alert('product removed from cart')

    }

    const clearCart = () => {
        setCartitems([]);
    };
    
    const getCartTotal = () => {
        return cartitems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const addshippinginfo=(shippingdetails)=>{
        localStorage.setItem('shippingdetails',JSON.stringify(shippingdetails))
        setShipping(shippingdetails)
    }
      
    
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartitems));
    }, [cartitems]);
    
    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          setCartitems(JSON.parse(cartItems));
        }
    }, []);
    
    useEffect(() => {
        const Shipping = localStorage.getItem("shippingdetails");
        if (Shipping) {
          setShipping(JSON.parse(Shipping));
        }
    }, []);

    return(
        <Cartcontext.Provider value={{addtocart,removefromcart,cartitems,clearCart,getCartTotal,itemsincart,addshippinginfo,shipping}}>
            {children}
        </Cartcontext.Provider>
    )
}

export {Cartcontext,CartcontextProvider} 
