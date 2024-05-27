import { Link } from "react-router-dom"

import RelatedProduct from "../Relatedproduct/RelatedProduct"

function Hero() {
  return (
    <section >
        {/* main container */}
        <div className="bg-hero bg-cover bg-no-repeat bg-center max-padd-container ">
            {/* content container */}
            <div className="py-24 xs:py-32 ">
                {/*  */}
                <h3 
                    className="medium-18 tracking-wider"
                > 
                    TRENDY TREASURES
                </h3>
                <h1 
                    className="h1 capitalize max-w-2xl"
                >
                    Elevate Your Look 
                        <span className="text-secondary"> With Every Click. </span> 
                    Shop Today!
                </h1>
                <p 
                    className="my-7 max-w-[33rem]"
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos officia at illum molestiae ipsa Earum officia. 
                </p>

                {/* button */}
                <div className="p-2 my-9">
                   <Link className="btn-dark !py-5 rounded-xl" to="/"> Shop now</Link>
                </div>

                {/* related product */}
                <div className="mt-16">
                    <RelatedProduct/>
                </div>
            </div>
        </div>
    </section>
  )
}


export default Hero
