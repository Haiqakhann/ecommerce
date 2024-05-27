import React, { useEffect, useState } from 'react'
import { BsCartCheckFill } from 'react-icons/bs'
import { Link,  useNavigate } from 'react-router-dom'
const Myorder = () => {
    const navigate= useNavigate()

    const [orders,setOrders] =useState()
  
    useEffect(()=>{
        fetch(`http://localhost:4000/myorders`,{
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => setOrders(data))
    
    },[])
    return (
        <section>
            {
                orders && orders.length>0?(
                    <div className='max-padd-container bg-primary flexCenter flex-col  '>
                        <h2 className='my-6 h3 '>My Order</h2>
                        <table className='table-auto shadow-md rounded border-separate border-spacing-y-3'>
                            <thead className=" text-center text-gray-700 tracking-wider">
                                <tr>
                                    <th className='p-3'>
                                        Order ID
                                    </th>
                                    <th className='p-3'>
                                        Status
                                    </th>
                                    <th className='p-3'>
                                        Amount
                                    </th>

                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                
                                {
                                    orders.map((order)=>{
                                        return(
                                            <tr>

                                                <td className='p-3'><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                                                <td className='p-3'>{order.orderStatus}</td>
                                                <td className='p-3'>{order.totalPrice}</td>
                                            </tr>
                                        )    
                                    })
                                }
                            </tbody>

                        </table>
                    
                        <div className='flex gap-x-5'>
                            <div className='my-4 btn-secondary rounded-xl'>
                                    <button
                                        onClick={()=>navigate(-1)}
                                    >
                                        Go Back
                                    </button>
                            </div>

                        </div>
                    </div>
                ):(
                    <div className='max-padd-container flexCenter flex-col h-72 bg-primary '>
                        <h2 className='medium-20 my-4'>No Orders Yet</h2>
                        <BsCartCheckFill className='medium-48 my-2'/>                        
                        <p className='regular-16 cursor-pointer' onClick={()=>navigate(-1)}>Go Back</p>
                    </div>
                )                
            }
               
            
        </section>
    )
}

export default Myorder
