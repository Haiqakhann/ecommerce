import {useContext} from 'react'
import {Cartcontext} from '../../Context/Cartcontext'
import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/Usercontext';


const Confirmorder = () => {
    const navigate = useNavigate()

    const {shipping,getCartTotal,cartitems} = useContext(Cartcontext)
    const {user} = useContext(Usercontext)
   

    const subtotal = getCartTotal()
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shipping.address}, ${shipping.city}, ${shipping.state}, ${shipping.pinCode}, ${shipping.country}`;
    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment')
    }
    return (
        <section>
            <div className='max-padd-container flexBetween bg-primary py-8'>
                <div  className='w-8/12 border-r-2 border-tertiary pr-14'>
                    <div className='my-4'>
                        <h2 className='h4 mb-6'>Shipping Info</h2>
                        <div className='flex gap-x-1 '>
                            <h3 className='regular-16'>Name: </h3>
                            <span className='regular-16'>{user.name}</span>
                        </div>
                        <div className='flex gap-x-1 my-2'>
                            <h3 className='regular-16'>Phone NO: </h3>
                            <span>{shipping.phoneNo}</span>
                        </div>
                        <div className='flex gap-x-1'>
                            <h3 className='regular-16'>Address:</h3>
                            <span>{address}</span>
                        </div>

                    </div>
                    <div className='my-10 '>
                        <h2 className='h4 mb-6'>Your Cart Items:</h2>
                        <div >
                            {cartitems &&
                                cartitems.map((item) => (
                                <div key={item.product} className='flexBetween w-[100%] mb-2 '>
                                    <div className='flexCenter'>
                                        <img src={`http://localhost:4000/images/${item.image}`} height={50} width={50} alt="Product" />
                                        
                                        <Link 
                                            to={`/product/${item.product}`}
                                            className='regular-18 px-4'
                                        >
                                        {item.name}
                                        </Link>
                                        <span className='regular-16'>
                                            ({item.size})                                   
                                        </span>
                                    </div>
                                    <div >
                                        <span className='regular-16 mr-2'>
                                            {item.quantity} * PKR{item.price} =
                                        
                                        </span>
                                        <span className='regular-16'>
                                            <b>PKR {item.price * item.quantity}</b>                                
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-1/4 text-center py-4'>
                    <div>
                        <h2 className='h4'>Order Summary</h2>
                        <div className='border-y-2 border-tertiary my-8 py-4'>
                            <div className='w-[100%] flexBetween '>
                                <h3 className='regular-16'>Subtotal:</h3>
                                <p>PKR {subtotal}</p>
                            </div>
                            <div className='w-[100%] flexBetween my-2'>
                                <h3 className='regular-16'>Shipping Charges:</h3>                                
                                <p>PKR {shippingCharges}</p>
                            </div>
                            <div className='w-[100%] flexBetween '>
                                <h3 className='regular-16'>GST:</h3>                                
                                <p>PKR {tax}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[100%] flexBetween '>
                        <h3 className='bold-18'>Total:</h3>                                
                        <p className='bold-15'>PKR {totalPrice}</p>
                    </div>

                    <button className='btn-secondary mt-8 w-[100%]' onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>

        </section>
  )
}

export default Confirmorder