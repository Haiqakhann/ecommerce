import React, { useContext } from 'react'
import {  Link } from 'react-router-dom'
import { Ordercontext } from '../../Context/Ordercontext'

const Allorders = () => {
    const {allorder,deleteorder} = useContext(Ordercontext)

    const onclickD=(e)=>{
        const id = e.target.value
        deleteorder(id)
    }

    return (
        <section>     
            <div  className='max-padd-container bg-primary flexCenter flex-col py-4'>
               <h2 className='my-6 h3 '>All Orders</h2>
     
                <table className='table-auto shadow-md rounded'>
                    <thead>
                        <tr className=" text-center text-gray-700 tracking-wider">
                            <th className='p-3'>Order ID</th>
                            <th className='p-3'>Status</th>
                            <th className='p-3'>Items Qty</th>
                            <th className='p-3'>Amount</th>
                            <th className='p-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {allorder && allorder.map((order,i)=>{
                            return(
                                <>
                                    <tr key = {i} >
                                        <td className='p-3'>{order._id}</td>
                                        <td className='p-3'>{order.orderStatus}</td>
                                        <td className='p-3'>
                                            {
                                                order.orderItems.reduce((acc,curr)=>{return acc+curr.quantity},0)
                                            }
                                        </td>
                                        <td className='p-3'>{order.totalPrice}</td>
                                        <td className='p-3'>
                                            <button className='px-3'onClick={onclickD} value={order._id}>
                                                Delete
                                            </button>
                                            <Link to={`/admin/order/${order._id}`}>
                                                Edit
                                            </Link>

                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
  )
}

export default Allorders
