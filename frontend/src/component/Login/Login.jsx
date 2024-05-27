import { useState,useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Usercontext} from "../../Context/Usercontext"

const Login = ()=>{

    const {user,login} =useContext(Usercontext)
    const navigate = useNavigate()
    const [errors,setErrors] = useState()
    
    
    useEffect(()=>{
        if(user){
            navigate(-1)
        }
    },[user,navigate])

    const [formdata , setFormData] = useState(
        {
            email:"",
            password:""
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
    
            if (!data.email.trim()) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(data.email)) {
                errors.email = 'Email is invalid';
            }
        
            if (!data.password) {
                errors.password = 'Password is required';
            } else if (data.password.length < 8) {
                errors.password = `Password must be at 
                least 8 characters long`;
            }
    
        return errors;
    };
    

    const onsubmit = (e)=>{
        e.preventDefault()
     
        const newErrors = validateForm(formdata);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            login(formdata)
            setFormData({
                email:"",
                password:""
            })
        } 
    }

    

    return(
        <section>
            <div  className='flexCenter flex-col max-padd-container bg-primary py-10'>
                <h2 className='h4 pb-4'>Login</h2>
                <form onSubmit={onsubmit}>
                    <div className='bg-white rounded-xl px-12 py-4 '>

                        <div className='flex flex-col regular-14  my-3'>
                            <label className='regular-18'>
                                Email
                            </label>
                            <input type="text" name="email"  placeholder="enter email" value={formdata.email} className='border-solid border-2 border-ternairy w-100% p-2' onChange={onchange}/>
                            {errors && errors.email &&
                                <span  className="text-secondaryRed">
                                    {errors && errors.email}
                                </span>
                            }
                        </div>
                        
                        <div className='flex flex-col regular-14  my-3'>
                            <label className='regular-18'>
                                Password
                            </label>
                            <input type="password" name="password"  placeholder="enter password" value={formdata.password} className='border-solid border-2 border-ternairy w-100% p-2' onChange={onchange}/>
                            {errors && errors.password &&
                                   <span  className="text-secondaryRed">
                                        {errors && errors.password}
                                    </span>
                            }
                        </div>

                        <div className='flex flex-col regular-18 my-4'>
                            <input type="submit" value='Continue' className='btn-dark'/>
                            
                        </div>

                        <div>
                            <Link to='/register'>No account? Register here</Link>
                        </div>
                    </div>

                    {/* <input type="submit" /> */}
                </form>

            </div>
    </section>



    )
}

export default Login