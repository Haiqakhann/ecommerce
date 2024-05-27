import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'


const ProductMap = ({id,image,name,description,price,category}) => {


  return (
    <div className='overflow-hidden p-3 rounded-3xl bg-white ring-1 ring-slate-900/5'>
      <div className='relative flexCenter overflow-hidden transition-all duration-100 rounded-3xl'>
        <img src={`http://localhost:4000/images/${image}`} alt={`${name}`}  className='w-full block transition-all duration-1000 h-80' />
      </div>
      <div className='px-5 pt-3'>
        <h3 className='medium-18 line-clamp-1'>{name}</h3>
        <p className='my-2 line-clamp-3'>{description}</p>
        <div className='flexBetween'>
            <div className='text-secondary bold-16'>
               PKR {price}
            </div>
            <Link to={`/${category}/${id}`} className='group'>
                <FaArrowRightLong className='bg-secondary text-white rounded-full h-10 w-10 p-3 group-hover:-rotate-45 transition-all duration-500:'/>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductMap
