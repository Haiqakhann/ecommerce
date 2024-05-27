import React, {  useState } from 'react'
import { useContext } from 'react'
import { Shopcontext } from '../../Context/Shopcontext'
const Addproduct = () => {

    const {addproduct} = useContext(Shopcontext)

    const [errors,setErrors] = useState()

    const [stock_s , setStock_s] =useState()
    const [stock_m , setStock_m] =useState()
    const [stock_l , setStock_l] =useState()
    const [stock_xl , setStock_xl] =useState()

    const [formdata , setFormData] = useState(
        {
            name:  "",
            description:"",
            image:null,
            new:"",
            popular:"",
            category:"",
            subCategory:"",
            price:"",
            variation:"",
        }
    );

    const onchange=(e)=>{
        const {name,value} = e.target
        setFormData(
            {...formdata ,[name]: value}
        )    
    }

    const validateForm = (data,s,m,l,xl) => {
        const errors = {};

            if (!data.name.trim()) {
                errors.name = 'name is required';
            }
            if (!data.description.trim()) {
                errors.description = 'description is required';
            }
            
            if (!data.price) {
                errors.price = 'price is required';
            }
            if (data.image===null) {
                errors.image = 'image is required';
            }

            if (!data.new) {
                errors.new = 'new is required';
            }
        
            if (!data.popular) {
                errors.popular = 'popular is required';
            }

            if (!data.category) {
                errors.category = 'category is required';
            }

            if (!data.subCategory.trim()) {
                errors.subCategory = 'subCategory is required';
            }

            if (!s) {
                errors.s = "small size's quantity is required";
            }
            
            if (!m) {
                errors.m = "medium size's quantity is required";
            }

            if (!l) {
                errors.l ="large size's quantity is required";
            }
            
            if (!xl) {
                errors.xl = "Extra large size's quantity is required";
            }
                  
        return errors;
    };



    const onsubmit = async(e)=>{
        e.preventDefault()
        const newErrors = validateForm(formdata,stock_s,stock_m,stock_l,stock_xl);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {

            formdata.variation = 
                {
                    size:[
                        {
                            name:"s",
                            stock:stock_s
                        },
                        {
                            name:"m",
                            stock:stock_m
                        },
                        {
                            name:"l",
                            stock:stock_l
                        },
                        {
                            name:"xl",
                            stock:stock_xl
                        }
                    ]
                }
            
            const data = new FormData();

            data.append('name', formdata.name);
            data.append('description', formdata.description);
            data.append('variation',  JSON.stringify(formdata.variation));
            data.append('new', formdata.new);
            data.append('popular', formdata.popular);
            data.append('category', formdata.category);
            data.append('subCategory', formdata.subCategory);
            data.append('price', formdata.price);
            data.append('image', formdata.image)
            
            addproduct(data)    


            setFormData(
                {
                    name:"",
                    description:"",
                    image:"",
                    new:"",
                    popular:"",
                    category:"",
                    subCategory:"",
                    price:"",
                    variation:""
                }
            )
            setStock_s("")
            setStock_m("")
            setStock_l("")
            setStock_xl("")
        }

    }




    return (
    <section>
        <div className='max-padd-container bg-primary py-6'>
            <h2 className='my-6 h3 '>Add New Product</h2>
            
            <form onSubmit={onsubmit}>
                <div>
                    <div className='flex flex-wrap  gap-x-8'>
                        <div className='flex flex-col  regular-18 my-4 '>
                            <label className='my-1'>
                                Name
                            </label>
                            <input type="text" name="name" placeholder='enter product name' value={formdata.name} onChange={onchange} className='border-solid border-2 border-ternairy  regular-16 p-2 w-72' />
                            {errors && errors.name &&
                                <span className="text-secondaryRed">
                                    {errors && errors.name}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4 '>
                            <label  className='my-1'>
                                Description
                            </label>
                            <input type="text" name="description" placeholder='enter product description' value={formdata.description} onChange={onchange} className='border-solid border-2 border-ternairy regular-16 p-2 w-96' />
                            {errors && errors.description &&
                                <span className="text-secondaryRed">
                                    {errors && errors.description}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Image
                            </label>
                            <input type="file" onChange={e=>{
                                setFormData({
                                    ...formdata,
                                    image: e.target.files[0]
                                });
                            }} name="Image" className='border-solid border-2 border-ternairy regular-16 ' />
                            {errors && errors.image &&
                                    <span className="text-secondaryRed">
                                        {errors && errors.image}
                                    </span>
                            }
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-10'>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                New
                            </label>
                            <select
                                onChange={onchange}
                                className='border-solid border-2 border-ternairy regular-16 p-2 w-24'
                                name="new"
                            >
                                <option value="">new</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            {errors && errors.new &&
                                <span className="text-secondaryRed">
                                    {errors && errors.new}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Popular
                            </label>
                            <select
                                onChange={onchange}
                                className='border-solid border-2 border-ternairy  regular-16 p-2 w-28'
                                name="popular"
                            >
                                <option value="">popular</option>
                                <option value="true">True</option>
                                <option value="false">false</option>
                            </select>
                            {errors && errors.popular &&
                                <span className="text-secondaryRed">
                                    {errors && errors.popular}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Category
                            </label>
                            <select
                                onChange={onchange}
                                className='border-solid border-2 border-ternairy regular-16 p-2 w-32'
                                name="category"
                            >
                                <option value="">category</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kid">kids</option>
                            </select>
                            {errors && errors.category &&
                                <span className="text-secondaryRed">
                                    {errors && errors.category}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Sub-category
                            </label>
                            <input type="text" name="subCategory"  placeholder='enter sub category' value={formdata.subCategory} onChange={onchange} className='border-solid border-2 border-ternairy  regular-16 p-2 w-52' />
                            {errors && errors.subCategory &&
                                <span className="text-secondaryRed">
                                    {errors && errors.subCategory}
                                </span>
                            }
                        </div>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Price
                            </label>
                            <input type="number" name="price" placeholder='enter product price' value={formdata.price} onChange={onchange} className='border-solid border-2 border-ternairy regular-16 p-2 w-52' />
                            {errors && errors.price &&
                                <span className="text-secondaryRed">
                                    {errors && errors.price}
                                </span>
                            }
                        </div>
                    </div>

                    <div className='flex flex-wrap  gap-x-8'>
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Stock for size Small 'S'
                            </label>
                            <input type="number"  value={stock_s} placeholder='Stock for size Small "S"' onChange={(e)=>setStock_s(e.target.value)} className='border-solid border-2 border-ternairy regular-16 p-2 w-100%' />
                            {errors && errors.s &&
                                <span className="text-secondaryRed">
                                    {errors && errors.s}
                                </span>
                            }
                        </div>                    
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Stock for size Medium 'M'
                            </label>
                            <input type="number"  value={stock_m} placeholder="Stock for size Medium 'M'" onChange={(e)=>setStock_m(e.target.value)} className='border-solid border-2 border-ternairy regular-16 p-2 w-100%' />
                            {errors && errors.m &&
                                <span className="text-secondaryRed">
                                    {errors && errors.m}
                                </span>
                            }
                        </div>                    
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Stock for size Large 'L'
                            </label>
                            <input type="number" placeholder="Stock for size Large 'L'" value={stock_l} onChange={(e)=>setStock_l(e.target.value)} className='border-solid border-2 border-ternairy regular-16 p-2 w-100%' />
                            {errors && errors.l &&
                                <span className="text-secondaryRed">
                                    {errors && errors.l}
                                </span>
                            }
                        </div>                    
                        <div className='flex flex-col regular-18 my-4'>
                            <label className='my-1'>
                                Stock for size Extra Large'Xl'
                            </label>
                            <input type="number" placeholder="Stock for size Extra Large'Xl'" value={stock_xl} onChange={(e)=>{setStock_xl(e.target.value)}} className='border-solid border-2 border-ternairy regular-16 p-2 w-100%' />
                            {errors && errors.xl &&
                                <span className="text-secondaryRed">
                                    {errors && errors.xl}
                                </span>
                            }
                        </div>
                    </div>
                    <div className='text-center my-4'>
                        <input type="submit" value="submit" className='btn-secondary w-52'  />
                    </div>                  
                </div>
            </form>
        </div>
    </section>
  )
}

export default Addproduct







