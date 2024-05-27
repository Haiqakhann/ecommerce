import React, { useContext, useState } from 'react'
import { Shopcontext } from '../../Context/Shopcontext'
const Areviews = () => {
    const {getproductreview,success,reviews} = useContext(Shopcontext)

    const [errors,setErrors] = useState()

    const [formdata , setFormData] = useState(
        {
            id:""
        }
    );

    const onchange=(e)=>{
        const {name,value} = e.target
        setFormData(
            {...formdata ,[name]: value}
        )    
    }


    const validateForm = (data) => {
        const errors = {};
    
        
        if (!data.id.trim()) {
            errors.id = 'id is required';
        }
    
        return errors;
    };
    

    const onsubmit = (e)=>{
        e.preventDefault()
     
        const newErrors = validateForm(formdata);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            getproductreview(formdata)
            setFormData({
                id:""
            })
        } 
    }    
    return (
        <section>
     
            <div  className='max-padd-container bg-primary flexCenter flex-col py-4'>
               <h2 className='my-6 h3 '>Get Product Reviews</h2>
               <div>
               <form onSubmit={onsubmit}>
                    <div className='bg-white rounded-xl px-12 py-4 '>

                        <div className='flex flex-col regular-14  my-3'>
                            <label className='regular-18'>
                                Product ID
                            </label>
                            <input type="text" name="id"  placeholder="enter product id" value={formdata.id} className='border-solid border-2 border-ternairy w-100% p-2' onChange={onchange}/>
                            {errors && errors.id &&
                                <span  className="text-secondaryRed">
                                    {errors && errors.id}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <input type="submit" value='Continue' className='btn-dark'/>
                            
                        </div>
                    </div>
                </form>
               </div>

               <div>
                    {
                        
                        success?
                        reviews.length>0?
                        (
                            <div>
                                <table className='table-auto shadow-md rounded'>
                                    <thead>
                                        <tr className=" text-center text-gray-700 tracking-wider">
                                            <th className='p-3'>Name</th>
                                            <th className='p-3'>Rating</th>
                                            <th className='p-3'>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {reviews && reviews.map((review,i)=>{
                                            return(
                                                    <>
                                                        <tr key = {i} >
                                                            <td className='p-3'>{review.name}</td>
                                                            <td className='p-3'>{review.rating}</td>
                                                            <td className='p-3'>{review.comment}</td>
                                                          
                                                        </tr>
                                                    </>
                                                )
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                        :
                        (
                            <div className='my-4'> 
                                <h3 className='h4'>Product hasn't Reviewed YET.......</h3>
                            </div>
                        ):
                        (
                            <></>
                        )
                        
                    }
               </div>
                            
            </div>

        </section>
  )
}

export default Areviews

