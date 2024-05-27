import { NavLink } from "react-router-dom";
const Menu = ({containerStyle})=>{
    const menus = [
        {
            name:'Home',
            link:'/'
        },
        {
            name:'Men',
            link:'/men'
        },
        {
            name:'Women',
            link:'/women'
        },
        {
            name:'Kids',
            link:'/kids'
        },
    ]

    return(
        <nav className={`${containerStyle}`} >
            {
                menus.map((menu,key)=>{
                    return(
                            <NavLink 
                                to={menu.link}
                                className={
                                    ({isActive} ) => {
                                        return isActive ? "active-link" : "";
                                    }
                                }
                            >
                                {menu.name}
                            </NavLink>
                    )
                })
            }
        </nav>
    )
}

export default Menu

