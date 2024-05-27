import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = ({productname}) => {
    const {pathname} = useLocation()
    const pathnames = pathname.split('/').filter(x => x)
    let breadcrumbpath =""

    return (
    <>
        <span>
            <Link to='/'>
                Home
            </Link>
        </span>
        <span>/</span>
        {
            pathnames.map((path,i)=>{
                breadcrumbpath += `/${path}`
                const isLast = i === pathnames.length-1
                return isLast?
                    (
                        <span key={breadcrumbpath}>{productname}</span>
                    ):(
                        <>
                            <span key={breadcrumbpath}>
                                <Link to={breadcrumbpath}>
                                     {path}
                                </Link>
                            </span>
                            <span>/</span>
                        </>

                    )
            })
        }
    </>
  )
}

export default Breadcrumb
