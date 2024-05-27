import React ,{useRef,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements,} from "@stripe/react-stripe-js";
import {Cartcontext} from '../../Context/Cartcontext'
import { Ordercontext } from '../../Context/Ordercontext';
import { Usercontext } from '../../Context/Usercontext';


import axios from 'axios';


const Payment = () => {

    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const {cartitems,shipping} =useContext(Cartcontext)
    const {orderCreate} = useContext(Ordercontext)
    const {user} = useContext(Usercontext)

    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const paymentAmount= {
        amount : Math.round(orderInfo.totalPrice *100)
    }

    const order = {
        shippingInfo:shipping,
        orderItems: cartitems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };
    
    
    const onsubmit=async(e)=>{
        e.preventDefault()
        payBtn.current.disabled =true
        
        try{

            const config = { headers: { "Content-Type": "application/json" },withCredentials :true };


            const {data} = await axios.post("http://localhost:4000/payment/process",paymentAmount,config)
            const client_secret = data.client_secret

            if(!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        
                        address: {
                            line1: shipping.address,
                            city: shipping.city,
                            state: shipping.state,
                            postal_code: shipping.pinCode,
                            country: shipping.country,
                          },
                    
                    },

                }
            })

            if (result.error) {
                payBtn.current.disabled = false;
        
                alert(result.error.message);
            } 
            else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    alert('payment done')
                    orderCreate(order)
                    navigate('/order/success')
                }
                else{
                    alert('some error while processing payment')
                }
            }
        }
        catch(err){
            payBtn.current.disabled = false;
            alert('some error while processing payment')
            
            const error=err
        }
    
    }


    return (
        <section>
            <div className='max-padd-container flexCenter flex-col bg-primary py-8'>
                <h2 className='h4 pb-2'>Card Info</h2>
                <div className='bg-white rounded-xl px-12 py-4 '>
                    <form onSubmit={onsubmit}>
                        <div className='my-5 w-48'>
                            <label className='regular-16'>
                                Card Number
                            </label>
                            <CardNumberElement className='border-solid border-2 border-ternairy w-100% mt-2 py-1'/>
                            
                        </div>
                        <div className='my-5 w-48'>
                            <label className='regular-16'>
                                Card Expiry
                            </label>                            
                            <CardExpiryElement className='border-solid border-2 border-ternairy w-100% mt-2 py-1'/>
                        </div>
                        <div className='my-5 w-48'>
                            <label className='regular-16'>
                                Card Pin
                            </label>
                            <CardCvcElement className='border-solid border-2 border-ternairy w-100% mt-2 py-1'/>
                        </div>
                        <div className='my-5 w-36 px-3'>
                            <input type="submit" value={`Pay - PKR ${orderInfo && orderInfo.totalPrice}`} ref={payBtn}  className='btn-secondary'/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Payment
