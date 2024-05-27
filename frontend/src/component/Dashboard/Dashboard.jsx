import React, { useContext, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Ordercontext } from '../../Context/Ordercontext'
import { Usercontext } from '../../Context/Usercontext'
import { Shopcontext } from '../../Context/Shopcontext'

const Dashboard = () => {

    const {allorder,totalA,getallorder} = useContext(Ordercontext)
    const {products} = useContext(Shopcontext)
    const {allusers} = useContext(Usercontext)

    
    useEffect(() => {
        getallorder()
    }, []);

    return (
        <section>
            <div className='max-padd-container bg-primary py-10  flexBetween'>
                <Sidebar/>
                <div className='m-4 bg-white w-4/5 px-12 text-center '>
                    <h2 className='text-center h3 p-4'>Dashboard</h2>
                    <div className='w-[100%] bg-secondaryRed py-4  text-white'>
                        <h3 className='medium-22'>Total Amount</h3>
                        <h4 className='medium-18'>{totalA && totalA}</h4>
                    </div>
                    <div className='flexCenter my-4 '>
                        <div className='w-36 h-36 rounded-full bg-secondaryYellow text-white flexCenter flex-col'>
                            <h3 className='medium-20'>Products</h3>
                            <h4 className='medium-18'> {products && products.length}</h4>
                        </div>
                        <div className='w-36 h-36 rounded-full bg-secondaryGreen text-white flexCenter flex-col mx-8'>
                            <h3 className='medium-20'>Orders</h3>
                            <h4 className='medium-18'> {allorder && allorder.length}</h4>
                        </div>
                        <div className='w-36 h-36 rounded-full bg-secondaryBlue text-white flexCenter flex-col'>
                            <h3 className='medium-20'>Users</h3>
                            <h4 className='medium-18'>{allusers && allusers.length} </h4>
                        </div>


                    </div>
                </div>
            </div>            
        </section>


    )
}

export default Dashboard
