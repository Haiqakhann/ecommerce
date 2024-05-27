import React, { useState ,useContext} from 'react'
import { FaStar } from 'react-icons/fa'


import { Shopcontext } from '../../Context/Shopcontext'
import { Usercontext } from '../../Context/Usercontext'


const Reviews = () => {
    const {product,addproductreview} = useContext(Shopcontext)
    const {user} = useContext(Usercontext)


    const [rating,setRating] = useState(product.ratings)
    const [reviews,setReviews] = useState(product.reviews)
    const [numOfReviews,setNumOfReviews] = useState(product.numOfReviews)
    const [comment,setComment] = useState("")
    const [hover,setHover] = useState(null)
    const [errors,setErrors] = useState()

    const onchange=(e)=>{
        setComment(e.target.value)
    }
    const validateForm = (data) => {
        const errors = {};
    
        if (!data.comment) {
            errors.comment = 'comment is required';
        } 
        
        return errors;
        
    }

    const onsubmit = (e)=>{
        e.preventDefault()
        const review = {
            rating:rating,
            comment:comment,
            productId:product._id
        }
        const newErrors = validateForm(review);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            addproductreview(review)
            setComment()
        }
    }


  return (
    <>
        <h3 className='text-center h3 my-4'>Reviews</h3>

        <div  className={`${numOfReviews===0?"flexCenter":'flexBetween flex-col xl:flex-row gap-y-4 xl:gap-y-0'}`}>
            {
                numOfReviews>0?
                (
                    <div className='bg-white rounded-xl px-10 py-10 flexBetween flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4 h-fit '>
                        {
                            reviews.map((review,i)=>{
                                return(
                                    <div className='bg-primary p-10'>
                                        <h4 className='bold-16 '>{review.name}</h4>
                                        <div className='flex items-start gap-x-2 medium-16 py-1'>
                                            {
                                                [...Array(5)].map((star,i )=>{     
                                                    const currentrating = i+1
                                                    return(
                                                        <FaStar 
                                                            className={`${currentrating<=(review.rating)? "text-yellow-500":
                                                            "text-tertiary"}`}
                                                        />
                                                    )
                                                })
                                            }
                                            ({review.rating})
                                        </div>
                                        <p className='medium-16'>{review.comment}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
                :
                (<></>)
            }

            <div className=' bg-white rounded-xl px-20 py-10'>
                
                <div>
                    <h4 className='bold-16'>You're Reviewing :</h4>
                    <p className='h4'>{product.name}  </p>
                </div>
                <form >
                    <div >
                        <div className='regular-18 my-2'>
                            Your rating
                            <div className='flex items-start gap-x-2 medium-16 py-1'>
                                {
                                    [...Array(5)].map((star,i )=>{     
                                        const currentrating = i+1
                                        return(
                                            <label key={i}>
                                                <input 
                                                    className='hidden'
                                                    type="radio" 
                                                    name="ratings"
                                                    value={currentrating}
                                                    onClick={()=>setRating(currentrating)} 
                                                    key={i+1} />
                                                <FaStar 
                                                    className={`${currentrating<=(hover||rating)? "text-yellow-500":
                                                    "text-tertiary"} cursor-pointer`}
                                                    onMouseEnter={()=>{setHover(currentrating)}}
                                                    onMouseLeave={()=>setHover(null)}
                                                />
                                            </label>
                                        )
                                    })
                                }
                                {
                                    errors && errors.rating &&
                                        <span  className="text-secondaryRed">
                                            {errors && errors.rating}
                                        </span>
                                }

                            </div>
                        </div> 
                        <div className='flex flex-col regular-18 my-3'>
                            <label >
                                name
                            </label>
                            <input type="text" name="name" className='border-solid border-2 border-ternairy w-100%' value={user && user.name} readOnly/>
                        </div>
                        <div className='flex flex-col regular-18 my-3'>
                            <label >
                                comment
                            </label>
                            <input type="text" name="comment" value={comment} className='border-solid border-2 border-ternairy w-100% py-4' onChange={onchange} />
                            {
                                errors && errors.comment &&
                                    <span  className="text-secondaryRed">
                                        {errors && errors.comment}
                                    </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <button type="button" className='bg-tertiary text-white  rounded-md py-2 px-2 outline-none' onClick={onsubmit}>
                                submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </>
)

}

export default Reviews


