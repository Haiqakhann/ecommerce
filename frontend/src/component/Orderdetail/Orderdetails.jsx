import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Ordercontext } from '../../Context/Ordercontext'

const Orderdetails = () => {

    
    const id = useParams()
    const ID = id.id

    const {singleorder,order} = useContext(Ordercontext)

    useEffect(()=>{
        singleorder(ID)

    },[])

    return (
        <section>
            {
                order &&
                <div className='max-padd-container py-8 bg-primary'>
                    <h2 className='my-6 h3'>
                        Order #{ order._id}
                    </h2>
                    <div >
                        <div className='my-4'>
                            <h3 className='h4 mb-4'>Shipping Info</h3>
                            <div className='flex gap-x-1 '>
                                <h4 className='regular-16'>Name: </h4>
                                <span className='regular-16'>{order.user && order.user.name}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h4 className='regular-16'>Phone NO: </h4>
                                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h4 className='regular-16'>Address:</h4>
                                <span>
                                    {order.shippingInfo &&
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                </span>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h3 className='h4 mb-4'>Payment Info</h3>
                            <div className='flex gap-x-1 '>
                                <span className='regular-16'>{order.paymentInfo &&
                                    order.paymentInfo.status === "succeeded"
                                    ? "PAID"
                                    : "NOT PAID"}
                                </span>
                            </div>
                            <div className='flex gap-x-1 my-2'>
                                <h4 className='regular-16 '>Amount: </h4>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className='h4 mb-4'>Order Info</h3>
                            <div >
                                <div className='flex gap-x-1 my-2'>
                                    <h4 className='regular-16'>Status:</h4>
                                    <span>
                                        {order.orderStatus && order.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className='regular-16 my-2'>Order Items:</h4>
                                <div >
                                    {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        
                                        <div key={item.product} className='flex gap-x-48 w-[100%] mb-2 '>
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

                    </div>
                </div>
            }

        </section>
  )
}

export default Orderdetails
