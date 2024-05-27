import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard ,MdArrowDownward, MdReviews, MdArrowUpward} from 'react-icons/md'
import { BiPlus, } from 'react-icons/bi'
import { AiFillProduct } from 'react-icons/ai'
import { RiOrderPlayFill } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'



const Sidebar = () => {

    const [isopen,setIsopen]= useState(false)
    const toggle =()=>{
        setIsopen(!isopen)
    }

    return (
    <div className='mr-10 bg-white p-8 w-1/5'>
        <div >
            <Link to="/admin/dashboard" className='flex '>
                <MdDashboard className='medium-24'/>
                <h2  className='medium-16'> Dashboard</h2>
            </Link>
        </div>
        <div className='my-5'>
            <div className='medium-16' onClick={toggle}>
                <div className='flex  cursor-pointer' onClick={toggle}>
                {!isopen?
                            (
                                <MdArrowDownward className='medium-24' />

                            )
                            :
                            (
                                <MdArrowUpward className='medium-24' />

                            )
                        }


                    <h2  className='medium-16' > Products</h2>
                </div>
                {
                    !isopen? (                    
                        <></>
                        )
                        :
                        (
                            <div className='my-1'>
                                <Link to="/admin/product/create" className='flex my-1'>
                                    <BiPlus className='medium-24'/> 
                                    <h2  className='medium-16'>Create Products</h2>
                                </Link>
                                <Link to="/admin/product/all" className='flex mb-1'>
                                    <AiFillProduct className='medium-24'/> 
                                    <h2  className='medium-16'>All Products</h2>
                                </Link>
                            </div>
                        )                        

                }
            </div>

        </div>
        <div  className='my-5'>
            <Link to="/admin/order/all" className='flex'>
                <RiOrderPlayFill  className='medium-24'/>
                <h2  className='medium-16'>Orders</h2>
         
            </Link>
        </div>
        <div>
            <Link to="/admin/user" className='flex'>
                <BiUser  className='medium-24'/>
                <h2  className='medium-16'>Users</h2>
  
            </Link>
        </div>
        <div className='my-5'>
            <Link to="/admin/reviews" className='flex'>
                <MdReviews  className='medium-24'/> 
                <h2  className='medium-16'>Reviews</h2>
                
            </Link>
        </div>
    </div>
  )
}

export default Sidebar
