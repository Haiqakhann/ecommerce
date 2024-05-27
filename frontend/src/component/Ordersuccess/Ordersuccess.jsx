import React from 'react'
import { Link } from 'react-router-dom'


const Ordersuccess = () => {

    return (
        <section>
            <div className='max-padd-container flexCenter flex-col h-72 bg-primary '>
               
                <h2 className='medium-20 my-4'>
                    your order has been placed successfully
                </h2>
                <Link to='/order/my' className='btn-dark'>View orders</Link>
            </div>
        </section>
    )
}

export default Ordersuccess
