import React, { useContext } from 'react'
import { Link,  } from 'react-router-dom'

import { Usercontext } from '../../Context/Usercontext'

const Allusers = () => {
    const {allusers,deleteuser} = useContext(Usercontext)

    const onclickD=(e)=>{
        const id = e.target.value
        deleteuser(id)
    }

    return (
        <section>
            <div className='max-padd-container bg-primary flexCenter flex-col py-4'>
                <h3  className='my-6 h3 '>
                    All Users
                </h3>
                <table className='table-auto shadow-md rounded'>
                <thead>
                        <tr className=" text-center text-gray-700 tracking-wider">
                            <th className='p-3'>User ID</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>Name</th>
                            <th className='p-3'>Role</th>
                            <th className='p-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {allusers && allusers.map((user,i)=>{
                            return(
                                <>
                                    <tr key = {i} >
                                        <td className='p-3'>{user._id}</td>
                                        <td className='p-3'>{user.email}</td>
                                        <td className='p-3'>{user.name}</td>
                                        
                                        <td className='p-3'>{user.role}</td>
                                        <td className=''>
                                            <button onClick={onclickD} value={user._id} className='mr-2'>
                                                Delete
                                            </button>
                                            <Link to={`/admin/user/${user._id}`}>
                                                Edit
                                            </Link>

                                        </td>

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

export default Allusers
