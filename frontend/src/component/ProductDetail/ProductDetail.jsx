import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'

import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Rating from '../Rating/Rating'
import Reviews from '../Reviews/Reviews'


import { Shopcontext } from '../../Context/Shopcontext'
import {Cartcontext} from '../../Context/Cartcontext'


const ProductDetail = () => {

    const id = useParams()
    const ID = id.id
    const {product,singleproduct} = useContext(Shopcontext)
    
    const {addtocart} = useContext(Cartcontext)
    
    const [sel_size,setSel_size] =useState('s')

    let [selquantity,setSelquantity] = useState(1)
    const [selectsizestock,setSelectsizestock] = useState(0)


    useEffect(()=>{
        singleproduct(ID)

    },[])

    useEffect(()=>{
        if(product)
            {
                const stockk = product.variation[0].size.filter((sizes)=>sizes.name === sel_size)[0]
                if(stockk) {

                    setSelectsizestock(stockk.stock)
                    setSelquantity(1)
                    
                }
                else{
                    
                    setSelectsizestock(0)

                }
            }
        },[sel_size,product]
    )

    const handleaddtoCart=()=>{
        // e.preventDefault()  
        
        const item = {
            name:product.name,
            price:product.price,
            size:sel_size,
            quantity:selquantity,
            image:product.image,
            product:product._id
        } 


        addtocart(item)
        alert('product added to cart')
    }

    const incrementQuantity = ()=>{
        if(selquantity< selectsizestock){
            setSelquantity(selquantity+1)
        }
        
    }

    const decrementQuantity = ()=>{
        if(selquantity>2){
            setSelquantity((prev)=>prev-1)
            
        }
        
    }


    if(product){
        return (
            <>
                <section className='max-padd-container bg-primary' >
                    <div >
                        {/* breadcrumbs */}
                        <div className='flex items-center flex-wrap gap-x-2 medium-16 py-4 capitalize bg-primary'>
                            <Breadcrumb productname={product.name}/>
                        </div>

                        <div className='maxx-padd-container flexCenter flex-col gap-8 xl:flex-row py-4'>
                            {/* image */}
                            <div className='pr-2 py-5 max-h-[500px] w-auto flex'>
                                <img src={`http://localhost:4000/images/${product.image}`} alt='' height={500} width={500} className='rounded-xl bg-gray-10' />
                            </div>
                            {/* details */}
                            <div className='flex-col flex xl:flex-[1.5] bg-white py-2 px-6 rounded-xl' >
                                <h2 className='h3 sm:line-clamp-1'>{product.name}</h2>
                                <p className='my-2'> {product.description}</p>
                                {/* rating */}
                                <div className='flex items-start gap-x-2 medium-16'>
                                    <Rating />
                                </div>
                                <p className='bold-28 sm:bold-32 mt-4 '>{product.price}</p>
                                {/* size */}
                                    <div className='flex flex-col gap-x-10 gap-y-3 my-6'>
                                        <h3 className='bold-16'>
                                            Select Size:
                                        </h3>
                                        <div className='flex gap-3 my-3'>
                                            <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md'>
                                                <label>
                                                    <input 
                                                        className='hidden peer'
                                                        type="radio" 
                                                        name="size"
                                                        value='s'  
                                                        
                                                        // checked
                                                        onClick={(e)=>
                                                            {
                                                                setSel_size(e.target.value)
                                                            }
                                                        }
                                                    />
                                                    <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md cursor-pointer peer-checked:bg-slate-300'>S</div>    
                                                </label>
                                            </div>
                                            <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md'>
                                                <label>
                                                    <input 
                                                        className='hidden peer'
                                                        type="radio" 
                                                        name="size"
                                                        value='m'  
                                                        // checked
                                                        onClick={(e)=>
                                                            {
                                                                setSel_size(e.target.value)
                                                            }
                                                        }
                                                    />
                                                    <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md cursor-pointer peer-checked:bg-slate-300'>M</div>    
                                                </label>
                                            </div>
                                            <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md'>
                                                <label>
                                                    <input 
                                                        className='hidden peer'
                                                        type="radio" 
                                                        name="size"
                                                        value='l'  
                                                        // checked
                                                        onClick={(e)=>
                                                            {
                                                                setSel_size(e.target.value)
                                                            }
                                                        }
                                                    />
                                                    <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md cursor-pointer peer-checked:bg-slate-300'>X</div>    
                                                </label>
                                            </div>
                                            <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md'>
                                                <label>
                                                    <input 
                                                        className='hidden peer'
                                                        type="radio" 
                                                        name="size"
                                                        value='xl'  
                                                        // checked
                                                        onClick={(e)=>
                                                            {
                                                                setSel_size(e.target.value)
                                                            }
                                                        }
                                                    />
                                                    <div className='ring-2 ring-slate-900 h-10 w-10 flexCenter cursorPointer rounded-md cursor-pointer peer-checked:bg-slate-300'>XL</div>    
                                                </label>
                                            </div>                                            
                                            
                                        </div>
                                    </div>
                                    {
                                        selectsizestock?(
                                            <div className='mb-2 medium-16'>
                                            Select Quantity
                                            <div className='flex gap-x-4 my-4'>
                                                <div className='ring-2 ring-slate-900 h-7 w-7 flexCenter cursorPointer rounded-full'>
                                                    <button
                                                        className='flexCenter text-[20px]'
                                                        onClick={incrementQuantity}
                                                    >
                                                        +
                                                    </button>                                                        
                                                </div>          

                                                {selquantity} 
                                                
                                                <div className='ring-2 ring-slate-900 h-7 w-7 flexCenter cursorPointer rounded-full'>
                                                    <button
                                                        className='flexCenter text-[20px]'
                                                        onClick={decrementQuantity}
                                                    >
                                                        -
                                                    </button>                                                        
                                                </div> 

                                            </div>    
                                             
                                        </div>
                                        ):(
                                            <p className='my-1'>
                                                selected size is out of stock
                                            </p>
                                        )
                                    }
                                    {/* add to cart */}
                                    <div className='mb-8 max-w-[555px]'>
                                        <button className='btn-dark rounded-md' disabled={selectsizestock===0?true:false} onClick={handleaddtoCart}>Add to cart</button>
                                    </div>
                                {/* </form> */}
                                {/* category */}
                                <div>
                                    <h3>Category</h3>
                                    <p>{product.category} | {product.subCategory}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='max-padd-container bg-back py-8'  id='reviews'>
                    <div>
                        <Reviews />
                    </div>           
                </section>
            </>
        )
    }
    
}

export default ProductDetail
