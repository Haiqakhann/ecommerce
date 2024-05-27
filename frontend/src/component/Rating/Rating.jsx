import React from 'react'
import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'

import { Shopcontext } from '../../Context/Shopcontext'


const Rating = () => {
    const {product} = useContext(Shopcontext)

    const rating = product.ratings 
    const reviews = product.numOfReviews
    return (
        <>
            {
                rating===0 ?
                (
                    <NavLink to='#reviews'>
                        <p>Be The First To Review This Product</p>
                    </NavLink>
                ):(
                    <>
                       {
                        [...Array(5)].map((star,i )=>{     
                            const currentrating = i+1
                            return(
                                <FaStar 
                                    className={`${currentrating<=(rating)? "text-yellow-500":
                                    "text-tertiary"}`}
                                />
                            )
                        })
                       }
                       ({reviews})
                    </>

                )
            }
        </>
    )
}

export default Rating
