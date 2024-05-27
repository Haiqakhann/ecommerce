import React, { useEffect, useState } from 'react'
import { Ordercontext } from '../../Context/Ordercontext'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

const Editorder = () => {
    const {order,singleorder,updateorder} = useContext(Ordercontext)

    const id = useParams()
    const ID = id.id

    useEffect(() => {
        singleorder(ID);
    }, [ID, singleorder]);

    const[status,setStatus] = useState()
    let address
    if(order){
        address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`;
    }
    
    const onsubmit =(e)=>{
        e.preventDefault()
        const formdata = {
            status:status
        }
        updateorder(id,formdata)
    } 
    
    if(order){
        return (
            <section>
                <div  className='max-padd-container flexBetween bg-primary py-8  '>
                    <div className='w-8/12 border-r-2 border-tertiary pr-14 '>
                        <div  className='my-4'>
                            <h2  className='h4 mb-6'>Shipping Info</h2>
                            <div className='flex gap-x-1 '>
                                <h3 className='regular-16'>Name: </h3>
                                <span className='regular-16'>{order.user && order.user.name}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h3 className='regular-16'>Phone NO: </h3>
                                <span>{order.shippingInfo.phoneNo}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h3 className='regular-16'>Address: </h3>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div  className='my-4'>
                            <h2  className='h4 mb-6'>Payment Info</h2>
                            <div  className='flex gap-x-1 my-2'>                              
                                <h3 className='regular-16'>Status: </h3>
                                
                                <span className={`regular-20 ${order.paymentInfo.status}==='succedded`?'text-green-900':'text-red-900'} >{order.paymentInfo.status==='succeeded'? 'paid':"pending"}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h3 className='regular-16'>Amount: </h3>
                                <span>{order.totalPrice}</span>
                            </div>
                        </div>
                        <div  className='my-4'>
                            <h2 className='h4 mb-6'>Order Status</h2>
                            <div className='flex gap-x-1 my-2'>              
                                <h3 className='regular-16'>Status: </h3>

                                <span>{order.orderStatus}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>         
                                <h3 className='regular-16'>Amount:</h3>

                                <span>{order.totalPrice}</span>
                            </div>
                        </div>
                        <div className='my-10 '>
                            <h2 className='h4 mb-6'> Order Items:</h2>
                            <div >
                                {
                                    order.orderItems.map((item) => (
                                    <div key={item._id}  className='flexBetween w-[100%] mb-2 '>
                                        <div className='flexCenter'>
                                            <img src={`http://localhost:4000/images/${item.image}`} height={50} width={50} alt="Product" />
                                            <Link to={`/product/${item.product}`} className='regular-18 px-4'>
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
                    <div className='w-1/4 text-center py-4 '>
                        <div >
                            <h2  className='h4 my-4' >Process Order</h2>
                            <div >
                                <form onSubmit={onsubmit}>
                                    <div>
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Order Process</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <input type="submit" value="process" className='btn-secondary mt-8 w-[60%]'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    
                    </div>
                </div>
                
            </section>
      )
    }

}

export default Editorder
