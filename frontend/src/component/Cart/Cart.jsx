import { useContext } from 'react'
import {Cartcontext} from '../../Context/Cartcontext'
import { NavLink } from 'react-router-dom'
import { BsCartCheckFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const CartC = () => {
    const {cartitems,removefromcart,getCartTotal} = useContext(Cartcontext)
    const navigate = useNavigate()
    return (
        <section>
            
            {
                cartitems.length>0?(
                    <div className='max-padd-container bg-primary flexCenter flex-col  '>
                        <h2 className='my-6 h3 '>Cart Items</h2>
                        <table className='table-auto shadow-md rounded border-separate border-spacing-y-3'>
                            <thead className=" text-center text-gray-700 tracking-wider">
                                <tr>
                                    <th className='p-3'>
                                        Products
                                    </th>
                                    <th className='p-3'>
                                        Title
                                    </th>
                                    <th className='p-3'>
                                        Price
                                    </th>
                                    <th className='p-3'>
                                        Size
                                    </th>
                                    <th className='p-3'>
                                        Quantity
                                    </th>
                                    <th className='p-3'>
                                        total
                                    </th>
                                    <th className='p-3'>Remove</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                
                                {
                                    cartitems.map((item)=>{
                                        return(
                                            <tr>
                                                <td  className='p-3'>image</td>

                                                <td className='p-3'>{item.name}</td>
                                                <td className='p-3'>{item.price}</td>
                                                <td className='p-3'>{item.size}</td>
                                                <td className='p-3'>{item.quantity}</td>
                                                <td className='p-3'>{item.quantity*item.price}</td>
                                                <td className='p-3'><button onClick={()=>removefromcart(item)}>removefromcart</button></td>
                                            </tr>
                                        )    
                                    })
                                }
                            </tbody>
                            <tfoot className='text-center text-gray-700 tracking-wider'>
                                <tr>
                                    <td>
                                        Gross Total
                                    </td>
                                    <td>
                                        {
                                            getCartTotal()
                                        }
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        {/* <div>
                            <div>
                                <h2>Summary</h2>
                                <div>
                                    <h3>Subtotal</h3>
                                    <h4>${getCartTotal()} </h4>
                                </div>
                                <div>
                                    <h3>Shipping Fee</h3>
                                    <h4>${100}</h4>
                                </div>
                                <div>
                                    <h3>Total</h3>
                                    <h4>${getCartTotal() + 100}</h4>
                                </div>
                            </div>
                        </div> */}
                        <div className='flex gap-x-5'>
                            <div className='my-4 btn-secondary rounded-xl'>
                                    <button
                                        onClick={()=>navigate(-1)}
                                    >
                                        Go Back
                                    </button>
                            </div>
                            <div className='my-4 btn-secondary rounded-xl'>
                                    <NavLink
                                        to='/shipping'
                                    >
                                        Checkout
                                    </NavLink>
                            </div>

                        </div>
                    </div>
                ):(
                    <div className='max-padd-container flexCenter flex-col h-72 bg-primary '>
                        <h2 className='medium-20'>no product in cart</h2>
                        <BsCartCheckFill className='medium-48 my-2'/>                        
                        <p className='regular-16 cursor-pointer' onClick={()=>navigate(-1)}>Go Back</p>
                    </div>
                )
            }
        </section>
    )
}

export default CartC



