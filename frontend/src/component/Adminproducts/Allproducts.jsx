import React, { useContext } from 'react'
import { Shopcontext } from '../../Context/Shopcontext'
import { Link } from 'react-router-dom'
const Allproducts = () => {

    const {products,deleteproduct} = useContext(Shopcontext)

    const onclickD=(e)=>{
        const id = e.target.value
        deleteproduct(id)
    }
   
    return (
        <section>
            <div className='max-padd-container bg-primary flexCenter flex-col'>
                <h2 className='my-6 h3 '>All Products</h2>

                <table className='table-auto shadow-md rounded border-collapse '>
                    <thead className=" text-center text-gray-700 tracking-wider">
                        <tr>
                            <th rowSpan={2} className='p-3'>ID</th>
                            <th rowSpan={2} className='p-3'>Product name</th>
                            <th colSpan={2} className='p-3'>Variation</th>
                            <th rowSpan={2} className='p-3'>Price</th>
                            <th colSpan={2}  className='p-3'>Action</th>
                        </tr>
                        <tr className='p-3  border-b-3'>
                            <th  className='p-3'>size</th>
                            <th  className='p-3'>stock</th>
                            <th className='p-3'>Edit</th>
                            <th className='p-3'>Delete</th>
                        </tr>
                    </thead>
                    <tbody  className='text-center'>
                        {products && products.map((prod,i)=>{
                            return(
                                <>
                                    <tr key = {i} className=' '>
                                        <td rowSpan={4} className='p-3'>{prod._id}</td>
                                        <td rowSpan={4} className='p-3'>{prod.name}</td>
                                        {
                                            prod.variation[0] &&
                                            <>
                                                <td className='pt-3'>{prod.variation[0].size[0].name}</td>
                                                <td className='pt-3'>{prod.variation[0].size[0].stock}</td>
                                            </>
                                            
                                        }
                                        
                                        <td className='' rowSpan={4}>{prod.price}</td>
                                        <td className='' rowSpan={4}>
                                            <Link to={`/admin/product/${prod._id}`}>
                                                Edit
                                            </Link>
                                        </td>
                                        <td className='' rowSpan={4}>
                                            <button onClick={onclickD} value={prod._id}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        {
                                            prod.variation[0] && 
                                            <>
                                                <td className=''>{prod.variation[0].size && prod.variation[0].size[1].name}</td>
                                                <td className=''>{prod.variation[0].size && prod.variation[0].size[1].stock}</td>
                                            </>
                                        }
                                    </tr>
                                    <tr>
                                        {
                                            prod.variation[0] && 
                                            <>
                                                <td>{prod.variation[0].size[2].name}</td>
                                                <td>{prod.variation[0].size[2].stock}</td>
                                            </>
                                        }

                                    </tr>
                                    <tr className=' border-b-3' >
                                        {
                                            prod.variation[0] && 
                                            <>
                                                <td>{prod.variation[0].size[3].name}</td>
                                                <td>{prod.variation[0].size[3].stock}</td>
                                            </>
                                        }
                                    </tr>                                    
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
  )
}

export default Allproducts
