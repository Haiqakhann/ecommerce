import Header  from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
const Layout=()=>{
    return(
        <>
            <Header />
            <main>
                <Outlet/>
            </main>
            <footer className="max-padd-container bg-tertiary py-8">
                <Footer/>
            </footer>
        </> 
    )
}

export default Layout