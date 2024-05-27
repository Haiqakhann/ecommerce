import { createContext,  useCallback,   useEffect,  useState } from "react"
import axios from "axios";

const Usercontext = createContext()

const UsercontextProvider=({children})=>{

    const [user,setUser] = useState()
    const [error,setError] =useState()
    const [allusers,setAllusers] =useState()
    const [singleUser,setSingleUser] = useState()


    const register = async(userdata) =>{
        try {
            const config = { headers: { "Content-Type": "application/json" } ,withCredentials :true };

            const { data } = await axios.post(`http://localhost:4000/register/`,userdata,config);
            setUser(data.user)
            alert('Registration Successfull')
  
        } 
        catch (err) {
            setError(err.response.data.message)
        }
    }
  
    const login = async(userdata) =>{
        try {
            const config = { headers: { "Content-Type": "application/json" },withCredentials :true };

            const { data } = await axios.post(`http://localhost:4000/login`,userdata,config);
            setUser(data.user)
            alert('login successful')
        } 
        catch (err) {
            setError(err.response.data.message)
            if(err.response.data.message === 'invalid email or password') alert(err.response.data.message)
            else alert('login failed')
            setError()
            
        }
    }

    const logout = async() =>{
        try {

            const { data } = await axios.get(`http://localhost:4000/logout`,{withCredentials :true});
            console.log(data)
            setUser()
            alert('logout successful')

            
        } 
        catch (err) {
            setError(err.response.data.message)
            alert('logout failed')

        }
    }
   
  const getsingleuser = useCallback((ID) => {
        axios.get(`http://localhost:4000/admin/user/${ID}`,{withCredentials :true})
            .then((data) => {
                setSingleUser(data.data.user);

            }
        )
      .catch((err) => {const error = err});
  }, []); 

    const deleteuser= async(id)=>{
        try{
            axios.delete(`http://localhost:4000/admin/user/${id}`,{withCredentials :true})
            alert('user deleted')
            adminusers()
        
        }
        catch(err){
    
        //   setError(err.response.data.message)
          alert('user deletion failed')
        
        }
    }


    const updateuser= async(id,role)=>{
        try{
            const config = { headers: { "Content-Type": "application/json" },withCredentials :true };
            await axios.put(`http://localhost:4000/admin/user/${id.id}`,role,config);
            alert('user status updated')
            adminusers()
        }
        catch(err){
            // setError(err.response)
            alert('user status upgradation failed')
        }
    }

    const adminusers = ()=>{
        axios.get(`http://localhost:4000/admin/users`,{
            withCredentials :true})
            .then((data) => {
                setAllusers(data.data.Users)
            })
            .catch((err)=>{
                const error = err
                // setError(err.response)
            })
        }
      
    useEffect(()=>{
        adminusers()

    },[])

    return(
      < Usercontext.Provider value={{user,setUser,error,setError,register,login,logout,allusers,deleteuser,getsingleuser,updateuser,singleUser}}>
          {children}
      </ Usercontext.Provider>
    )
}

export {Usercontext,UsercontextProvider} 
