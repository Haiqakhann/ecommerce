import { Navigate ,Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Usercontext } from '../../Context/Usercontext';


const Protected = () => {
  const {user}= useContext(Usercontext)


  return (
    user ? <Outlet/> : <Navigate to="/login" />
  )
}

export default Protected