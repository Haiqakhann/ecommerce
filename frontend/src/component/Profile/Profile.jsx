import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/Usercontext';

const Profile = () => {
    const navigate = useNavigate()
    const{user} = useContext(Usercontext)

    // const {addshippinginfo,shipping} = useContext(Cartcontext)
   
    // const [shippingdata , setShippingData] = useState(
    //     shipping
    // );


    // const [countrycode,setCountrycode]= useState()
    // const [statecode,setStatecode]= useState()
    
      
  
  
    return (
        <section>
            <div className='flexCenter flex-col max-padd-container bg-primary py-6'>
                <h2 className='h4 pb-2'>User Profile</h2>
                <form onSubmit={onsubmit}>
                        <div  className='bg-white rounded-xl px-12 py-4 '>
                            <div className='flex flex-col regular-14  my-3'>
                                <label className='regular-18'>
                                    Name
                                </label>
                                <input type="text" name="address" value={user.name} className='border-solid border-2 border-ternairy w-100%' readOnly/>
                            </div>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Email
                                </label>
                                <input type="text" name="city" value={user.email} className='border-solid border-2 border-ternairy w-100%' readonly/>
                            </div>

                            <div className='flex flex-col regular-18 my-4'>
                                <button className='btn-dark'>Update </button>
                                {/* rounded-md py-2 px-2 outline-none */}
                                
                            </div>
                            <div className='flex flex-col regular-18 my-4'>
                                <button className='btn-dark'>Change Password </button>
                                
                                {/* <input type="submit" value='Change password' className='btn-dark'/> */}
                                {/* rounded-md py-2 px-2 outline-none */}
                                
                            </div>
                        </div>
                </form>
            </div>
        </section>
  )
}

export default Profile
