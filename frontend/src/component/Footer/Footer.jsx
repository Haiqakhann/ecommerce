import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import logo from "../../assets/img//logo.png"
import {FaYoutube,FaInstagram,FaFacebook,FaGithub ,FaLinkedin} from "react-icons/fa6"

const Footer = ()=>{
    return(
        <div className="flexCenter flex-col gap-y-4 ">
            {/* logo */}
            <div className="my-5">
                <Link to="/" className="flex items-center gap-x-2">
                    <img src={logo} alt="logo" height={31} width={31}  />
                    <span className="bold-24 hidden xs:flex text-white">HK-STORE</span>
                </Link>
            </div>
            <div className="py-4" >
                <Menu containerStyle={"flex gap-x-5 md:gap-x-10 medium-15 px-2 py-1 text-white"}/>
            </div>
            <div className="flex gap-16 pr-4">
                <Link to='https://www.youtube.com' className="text-secondaryRed text-2xl hover:-translate-y-1 transition-all duration-500"><FaYoutube/></Link>
                <Link to='https://www.instagram.com' className="text-secondaryYellow text-2xl hover:-translate-y-1 transition-all duration-500"><FaInstagram/></Link>
                <Link to='https://www.facebook.com' className="text-secondaryBlue text-2xl hover:-translate-y-1 transition-all duration-500"><FaFacebook/></Link>
                <Link to='https://www.github.com/haiqakhann' className="text-secondaryGreen text-2xl hover:-translate-y-1 transition-all duration-500"><FaGithub/></Link>
                <Link to='https://www.linkedin.com/in/haiqa-khan-04b175207' className="text-teal-400 text-2xl hover:-translate-y-1 transition-all duration-500"><FaLinkedin/></Link>
            </div>
            <div className="my-3 w-2/3 h-[1px] bg-white"></div>
            <div className="text-white">
                Copyright © <Link to={'/'}>HK-store</Link> | All rights reserved.
                {/* copyright */}
            </div>

        </div>
    )
}

export default Footer

