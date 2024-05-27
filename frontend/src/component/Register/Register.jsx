import { useState, useContext, useEffect } from "react";
import {Usercontext} from "../../Context/Usercontext"
import { Link, useNavigate } from "react-router-dom";


const Register = ()=>{
    const navigate = useNavigate()
    const {error,setError,register,user} =useContext(Usercontext)
    const [errors,setErrors] = useState()
    const [formdata , setFormData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    );

    useEffect(()=>{
        if(user){
            navigate(-1)
        }
    },[user,navigate])

    const onchange=(e)=>{
        const {name,value} = e.target
        setFormData(
            {...formdata ,[name]: value}
        )
    
    }
    const validateForm = (data) => {
        const errors = {};

        if(!error){
            if (!data.name.trim()) {
                errors.name = 'name is required';
            }
            else if (data.name.length < 4) {
                errors.name = `name must be atleast 4 characters long`;
            }
            else if (data.name.length > 20) {
                errors.name = `name must be atmost 20 characters long`;
            }
            
            
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
        }
        else{
            if(error==='email already taken'){
                alert(error)
                setError("")
            }
            else{
                alert('Registeration Failed')
                setError("")

            }
                


            
        }
    
        return errors;
    };
    
    if(error){
        validateForm()
    }


    const onsubmit = (e)=>{
        e.preventDefault()

        const newErrors = validateForm(formdata);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            register(formdata)
            setFormData({
                name:"",
                email:"",
                password:""
            })
        }
    }

    return(
        <section>
            <div  className='flexCenter flex-col max-padd-container bg-primary py-10'>
                <h2 className='h4 pb-4'>Register</h2>
                <form onSubmit={onsubmit}>
                    <div className='bg-white rounded-xl px-12 py-4 '>
                    <div className='flex flex-col regular-14  my-3'>
                            <label className='regular-18'>
                                Name
                            </label>
                            <input type="text" name="name" placeholder="enter name" value={formdata.name} className='border-solid border-2 border-ternairy w-100% p-2' onChange={ onchange}/>
                            {errors && errors.name &&
                                <span className="text-secondaryRed">
                                    {errors && errors.name}
                                </span>
                            }
                        </div>

                        <div className='flex flex-col regular-14  my-3'>
                            <label className='regular-18'>
                                Email
                            </label>
                            <input type="email" name="email"  placeholder="enter email" value={formdata.email} className='border-solid border-2 border-ternairy w-100% p-2' onChange={onchange}/>
                            {errors && errors.email &&
                                <span className="text-secondaryRed">
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
                                   <span className="text-secondaryRed">
                                        {errors && errors.password}
                                    </span>
                                }
                        </div>

                        <div className='flex flex-col regular-18 my-4'>
                                <input type="submit" value='Continue' className='btn-dark'/>
                                
                        </div>

                        <div>
                            <Link to='/login'>Already have an account? Login here</Link>
                        </div>
                    </div>

                </form>


            </div>
        </section>
    )
}

export default Register