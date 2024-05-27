import { Link, NavLink ,useNavigate} from "react-router-dom";
import { useEffect, useState,useContext } from "react";

import Menu from "../Menu/Menu";
import { Usercontext } from "../../Context/Usercontext";
import { Cartcontext } from "../../Context/Cartcontext";

import logo from "../../assets/img/logo.png"
import User from "../../assets/img/user.svg"

import { MdMenu,MdClose} from "react-icons/md";
import { RiOrderPlayFill, RiShoppingCart2Line, RiDashboardFill} from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";


const Header = ()=>{

    const navigate = useNavigate()
 
    const {user,logout} = useContext(Usercontext)
    const {itemsincart} = useContext(Cartcontext)
    const [humbergerOpen,setHumbergerOpen] = useState(false)
    const [menuopen,setMenuopen] = useState(false)

    const togglehumberger = ()=>{setHumbergerOpen(!humbergerOpen)}
    const togglemenu = ()=>{setMenuopen(!menuopen)}
    
    const handleScroll = ()=>{
        if(window.scrollY>0)
            setHumbergerOpen(false)
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll)

        return ()=>{
            window.removeEventListener("scroll",handleScroll)
        }

    },[humbergerOpen])

    const handleclick=()=>{
        user !==undefined ?  togglemenu():navigate('/login')
    }


    return(
        
        <header className="max-padd-container w-full " >
            <div className="flexBetween py-3">
                
                {/* logo */}
                <div>
                    <Link to="/" className="flex items-center gap-x-2">
                        <img src={logo} alt="logo" height={31} width={31}  />
                        <span className="bold-24 hidden xs:flex">HK-STORE</span>
                    </Link>
                </div>
                
                {/* navbar and buttons */}
                <div className="flexCenter gap-x-4">
                    
                    {/* desktop navbar */}
                    <div>
                        <Menu containerStyle={"hidden md:flex gap-x-5 md:gap-x-10 "}/>
                    </div>
                    
                    {/* mobile navbar */}
                    <div>
                        <Menu containerStyle={`${humbergerOpen?"flex items-center flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition all duration-300 z-50 ":"flex items-center flex-col gap-y-12 fixed top-20  p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition all duration-300 z-50 -right-[100%]"}`}/>
                    </div>
                    
                    {/*buttons  */}
                    <div className="flexBetween gap-x-3 sm:gap-x-2 bold-16">
                        
                        {!humbergerOpen?
                            (
                                <MdMenu className="md:hidden cursor-pointer text-3xl hover:text-secondary" onClick={togglehumberger}/>
                            )
                            :
                            (
                                <MdClose className="md:hidden cursor-pointer text-3xl hover:text-secondary" onClick={togglehumberger}/>
                            )
                        }
                        
                        {/* cart and login */}
                        <div className="flexBetween gap-x-2 sm:gap-x-6">

                            {/* cart */}
                            <NavLink 
                                className="flex"
                                to='/cart'
                            >
                                <RiShoppingCart2Line 
                                    className="p2 h-8 w-8  hover:text-secondary"
                                 />
                                <span 
                                    className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 "
                                >
                                    {itemsincart}
                                </span>    
                            </NavLink>     
 
                            {/* login */}
                            <div className="relative">
                                <button 
                                    className=" btn-secondary flexCenter gap-x-2 medium-16 rounded-xl "
                                    onClick={handleclick}
                                >
                                    <img src={User} alt="user" width={19} height={19} />
                                    {user ? user.name:'login'}
                                </button>
                                
                                {!menuopen?
                                (
                                    <></>
                                )
                                :
                                (
                                    <div className={`${menuopen? "absolute right-0 -bottom-300 w-18 h-54 p-2 bg-white flex flex-col items-center  transition all duration-300 z-50 ":"flex items-center flex-col gap-y-12 fixed top-20  p-12 bg-white rounded-3xl shadow-md  medium-16 ring-1 ring-slate-900/5 transition all duration-300 z-50 -right-[100%]"}`}>
                                        
                                        <div className="w-12 h-12 bg-primary flexCenter rounded-full  my-4">
                                            <NavLink 
                                                className="flex"
                                                to='/order/my'
                                            >
                                                <RiOrderPlayFill 
                                                    className="p2 h-8 w-8  hover:text-secondary"
                                                />
                                            </NavLink>
                                        </div>
                                        {
                                            user && user.role === 'admin'?(                                        
                                            <div className="w-12 h-12 bg-primary flexCenter rounded-full my-4">
                                                <NavLink 
                                                    className="flex"
                                                    to='/admin/dashboard'
                                                >
                                                    < RiDashboardFill
                                                        className="p2 h-8 w-8  hover:text-secondary"
                                                    />
                                                </NavLink>
                                            </div>
                                            ):(<></>)
                                        }
                                        <div className="w-12 h-12 bg-primary flexCenter rounded-full my-4">
                                            <button onClick={()=>{
                                                logout()
                                                togglemenu()
                                            }}>    
                                                <BiLogOut 
                                                    className="p2 h-8 w-8  hover:text-secondary"
                                                />
                                            </button>
                                            
                                        </div>
                                   </div>
                                )
                            }
                            </div>
                            
                        </div>   
                    </div>
                       
                    
                </div>
                
            </div>
        </header>
    )
}

export default Header