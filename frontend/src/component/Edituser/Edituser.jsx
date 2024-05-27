import React, { useEffect, useState } from 'react'
import { Usercontext } from '../../Context/Usercontext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

const Edituser = () => {

    const id = useParams()
    const ID = id.id
    const {singleUser,updateuser,getsingleuser} = useContext(Usercontext)
    // const[Role,setRole] = useState()
    const [errors,setErrors] = useState()
    

    const [formdata,setFormdata] = useState(
        {
            name:"",
            email:"",
            role:""
        }
    )

    useEffect(() => {
        getsingleuser(ID);
    }, [ID, getsingleuser]);


    
    useEffect(() => {
        if (singleUser) {
            setFormdata({
                name: singleUser.name || "",
                email:singleUser.email|| "",
            });
        }
    }, [singleUser]);


    const onchange=(e)=>{
        const {name,value} = e.target
        
        setFormdata(
            {...formdata ,[name]: value}
        )
    }

    const validateForm = (data,s,m,l,xl) => {
        const errors = {};

            if (!data.name.trim()) {
                errors.name = 'name is required';
            }
            if (!data.email.trim()) {
                errors.email = 'email is required';
            }
            
            if (!data.role) {
                errors.role = 'role is required';
            }
                  
        return errors;
    };


    const onsubmit =(e)=>{
        e.preventDefault()
        const newErrors = validateForm(formdata);
        setErrors(newErrors);


        if (Object.keys(newErrors).length === 0) {
            updateuser(id,formdata)

            setFormdata(
                {
                    name:"",
                    
                }
            )
        }
    }




    
    
    if(singleUser){
        return (
            <section>
                <div  className='flexCenter flex-col max-padd-container bg-primary py-10'>
                        <h2 className='h4 pb-4 px-2'>Update Role</h2>
                        <div  className='bg-white rounded-xl px-12 py-4 '>
                            <form onSubmit={onsubmit}>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Name
                                </label>
                                <input type="name" value={formdata.name} className='border-solid border-2 border-ternairy w-100% p-2' readOnly/>
                                {
                                    errors && errors.name &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.name}
                                    </span>
                                }
                            </div>
                            <div className='flex flex-col regular-14 my-3'>
                                <label className='regular-18'>
                                    Email
                                </label>
                                <input type="name" value={formdata.email} className='border-solid border-2 border-ternairy w-100% p-2' readOnly/>
                                {
                                    errors && errors.email &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.email}
                                    </span>
                                }
                            </div>
                                <div className='flex flex-col regular-14 my-3'>
                                    <label className='regular-18'>
                                        User Role
                                    </label>
                                    <select name='role' onChange={onchange}
                                    className='border-2 p-2'    
                                    >
                                        <option value="">Choose Role</option>
                                        {singleUser.role === "user" && (
                                            <option value="admin">Admin</option>
                                        )}

                                        {singleUser.role === "admin" && (
                                            <option value="user">user</option>
                                        )}
                                    </select>
                                    {
                                    errors && errors.role &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.role}
                                    </span>
                                }
                                </div>
                                <div className='flex flex-col regular-18 my-4'>
                                    <input type="submit" value="update" 
                                    className='btn-dark'/>
                                </div>
                            </form>
                        </div>
                    
                </div>
            </section>
      )
    }

}

export default Edituser
