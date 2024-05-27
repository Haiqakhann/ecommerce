import {Swiper , SwiperSlide} from "swiper/react"
import { useContext } from "react"
import 'swiper/css'

import { Shopcontext } from "../../Context/Shopcontext"
import { Link } from "react-router-dom"

import { FaArrowRightLong } from 'react-icons/fa6'

function RelatedProduct() {

  const {products} =useContext(Shopcontext)

  return (
    <div>
        <h2 className="border-l-4 pl-2 border-secondary bold-20">
          Related Product
        </h2>

      <div className="mx-auto max-w-full ">
        <Swiper
          breakpoints={{
            600:{
              slidesPerView :2,
              spaceBetween :30 
            },
            1024:{
              slidesPerView :3,
              spaceBetween :30 
            },
            1200:{
              slidesPerView :4,
              spaceBetween :30 
            }
          }}
          className=" mt-5"
        >
          {products && products.map((item)=>{return(
            <SwiperSlide>
              <Link to={`/${item.category}/${item._id}`} id={item._id} className="flexCenter gap-x-5 bg-white backdrop-blur-md p-4 rounded-xl">
                <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} height={50} width={50} className="rounded-lg drop-shadow-xl" />
                <div className="flex flex-col gap-y-1">
                    <h3 className="line-clamp-1 medium-16">
                      {item.name}
                    </h3>
                    <p className="line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flexBetween gap-x-2 medium-16">
                      <span>PKR {item.price}</span>
                      <FaArrowRightLong className='bg-secondary text-white rounded-full h-9 w-9 p-3 hover:-rotate-45 transition-all duration-500:'/>
                    </div>
                </div>
              </Link>
            </SwiperSlide>
          )
            
          })
          }
        </Swiper>
      </div>
    </div>
  )
}

export default RelatedProduct
