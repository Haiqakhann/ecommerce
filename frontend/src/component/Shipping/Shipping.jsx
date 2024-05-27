import React, { useState,useContext } from 'react'
import {Cartcontext} from '../../Context/Cartcontext'
import { Country, State } from "country-state-city";
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const navigate = useNavigate()

    const {addshippinginfo,shipping} = useContext(Cartcontext)
    const [errors,setErrors] = useState()
   
    const [shippingdata , setShippingData] = useState(
        shipping
    );

    
    const onchange=(e)=>{
        const {name,value} = e.target
        
        setShippingData(
            {...shippingdata ,[name]: value}
        )
    }


    const validateForm = (data) => {
        const errors = {};

        if (!data.address.trim()) {
            errors.address = 'address is required';
        }
        if (!data.city.trim()) {
            errors.city = 'city is required';
        }
        if (!data.pinCode.trim()) {
            errors.pinCode = 'Pincode is required';
        }
        if (!data.phoneNo.trim()) {
            errors.phoneNo = 'phoneNo is required';
        }
        else if (data.phoneNo.length < 11) {
            errors.phoneNo = `phone no must be of 11 characters long`;
        }
        if (!data.country.trim()) {
            errors.country = 'country is required';
        }
        if (!data.state.trim()) {
            errors.state = 'state is required';
        }    
        return errors;
    };

    const onsubmit = (e)=>{
        e.preventDefault()
        const newErrors = validateForm(shippingdata);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            addshippinginfo(shippingdata)
            navigate('/order/confirm') 
            alert('shipping details saved')       
        } else {
            console.log(`Form submission failed
             due to validation errors.`);
        }

    }  
  
  
    return (
        <section>
            <div className='flexCenter flex-col max-padd-container bg-primary py-6'>
                <h2 className='h4 pb-2'>Shipping Details</h2>
                <form onSubmit={onsubmit}>
                        <div  className='bg-white rounded-xl px-12 py-4 '>
                            <div className='flex flex-col regular-14  my-3'>
                                <label className='regular-18'>
                                    Address
                                </label>
                                <input type="text" name="address" value={shippingdata.address} className='border-solid border-2 border-ternairy w-100%' onChange={onchange}/>
                                {errors && errors.address &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.address}
                                    </span>
                                }
                            </div>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    City
                                </label>
                                <input type="text" name="city" value={shippingdata.city} className='border-solid border-2 border-ternairy w-100%' onChange={onchange}/>
                                {errors && errors.city &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.city}
                                    </span>
                                }
                            </div>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Zip code
                                </label>
                                <input type="number" name="pinCode" value={shippingdata.pinCode} className='border-solid border-2 border-ternairy w-100%' onChange={onchange}/>
                                {errors && errors.pinCode &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.pinCode}
                                    </span>
                                }
                            </div>

                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Phone number
                                </label>
                                <input type="tel" name="phoneNo" value={shippingdata.phoneNo} className='border-solid border-2 border-ternairy w-100%' onChange={onchange}/>
                                {errors && errors.phoneNo &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.phoneNo}
                                    </span>
                                }
                            </div>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Country
                                </label>
                                <select
                                    value={shippingdata.country}
                                    onChange={onchange}
                                    className='border-solid border-2 border-ternairy w-100%'
                                    name="country"
                                >
                                    <option value="">country</option>
                                    {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                        </option>
                                    ))}
                                </select>
                                    {errors && errors.country &&
                                        <span className="text-secondaryRed">
                                            {errors && errors.country}
                                        </span>
                                    }

                            </div>
                            {shippingdata.country && (
                                <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    State
                                </label>
                                <select
                                    name="state"

                                    value={shippingdata.state}
                                    onChange={onchange}
                                    className='border-solid border-2 border-ternairy w-100%'
                                >
                                    <option value="">State</option>
                                {State &&
                                    State.getStatesOfCountry(shippingdata.country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                    ))}
                                </select>
                                {errors && errors.state &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.state}
                                    </span>
                                }
                            </div>
                            )} 
                            <div className='flex flex-col regular-18 my-4'>
                                <input type="submit" value='Continue' className='btn-dark'/>
                                
                            </div>
                        </div>
                </form>
            </div>
        </section>
  )
}

export default Shipping
