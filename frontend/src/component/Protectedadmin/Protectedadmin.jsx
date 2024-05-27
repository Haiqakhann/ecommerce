import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Usercontext } from '../../Context/Usercontext';
import Notfound from '../Notfound/Notfound';


const Protectedadmin = () => {
  const {user}= useContext(Usercontext)


  return (
    user.role ==="admin" ? <Outlet/> : <Notfound />
  )
}

export default Protectedadmin