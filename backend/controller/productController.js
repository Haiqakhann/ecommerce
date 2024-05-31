import { name } from "ejs";
import Product from "../model/product.js";
import multer from "multer";
import path from "path";
const upload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/images')
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+ "_" +Date.now() + path.extname(file.originalname))
        }
    })
})


const addProduct =  (req,res)=>{
    try {
            if (!req.body) {
                res.status(400).send({ message: "product cannot be empty" })
                return;
            }
            if (!req.file) {
                res.status(400).send({ message: "product image is required" })
                return;
            }
            
            // new product
            const {variation} = req.body 
            req.body.user = req.user.id
            req.body.image = req.file.filename
            req.body.variation = JSON.parse(variation)
            const product =  Product.create(req.body)
            
            res.status(201).send({ message: "product created" })
        
        } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while creating a product"
        })
    }            
            
}

const getProduct = async(req, res) => {
    try {
      const products= await Product.find()
      
       res.status(200).send(products);    
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while retrieving products"
        })
    }  
    
};

const updateProduct = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id)
        if(!product) res.status(500).send({ message: "product not found" })
        if(!req.body)  res.status(400).send({ message: "product cannot be empty" })
        const {variation} = req.body 
        req.body.user = req.user.id
        req.body.image = req.file.filename
        req.body.variation = JSON.parse(variation)
        product = await Product.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({
            message:"product updated successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error occur while updating products"
        })
    }
}

const deleteProduct = async(req,res)=>{
    try{
        let product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(500).send({ message: "product not found" })
        }
        await Product.deleteOne({_id:req.params.id})
        res.status(200).send({
            message:"product deleted successfully"
        })
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while deleting products"
        })
    }
}

const getProductDetail = async(req,res)=>{
    try {
            let product = await Product.findById(req.params.id)
            if(!product) res.status(404).send({ message: "product not found" })
            res.status(200).send(product)
        
    } catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while retrieving products"
        })
    }
}


const addProductReview = async(req,res)=>{
    try {
        const {rating,comment,productId} =req.body
        
        const review = {
            user : req.user._id,
            name : req.user.name,
            rating: Number(rating),
            comment:comment
        }
        let product = await Product.findById(productId)
        if(!product) res.status(500).send({ message: "product not found" })
       
        const isReviewed = product.reviews.filter((review)=>review.user.toString() === req.user._id.toString())

        if(isReviewed.length>0){
            product.reviews.forEach(review => {
               if(review.user.toString() === req.user._id.toString()){
                    review.rating =rating
                    review.comment = comment
               }
            });
        }
        else{
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }

        const ratings = product.reviews.reduce((acc,curr)=>{return(acc + curr.rating)},0) / product.reviews.length
        product.ratings = ratings

        await product.save({validateBeforeSave:false})

        res.status(200).send({
            message:"product review added successfully"
        })
    }
     catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while reviewing the product"
        })
    }

}


const getProductReview = async(req,res)=>{
    try {
        const {id} =req.body
        let product = await Product.findById(id)
        if(!product) res.status(500).send({ message: "product not found" })
        else{
            res.status(200).send(product.reviews)
    
        }
    }
     catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while reviewing the product"
        })
    }

}


const deleteProductReview = async(req,res)=>{
    try {
        const {productId} =req.body

        let product = await Product.findById(productId)
        if(!product) res.status(500).send({ message: "product not found" })
        
        const reviews = product.reviews.filter((review)=>review.user.toString() !== req.user._id.toString())
        const numOfReviews = reviews.length
        
        const ratings = reviews.reduce((acc,curr)=>{return(acc + curr.rating)},0) / reviews.length


        await Product.findByIdAndUpdate(productId,{
            reviews,
            ratings,
            numOfReviews
        })
        res.status(200).send({
            message:"review deleted successfully"
        })
    
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while deleting products"
        })
    }
}


export {addProduct,getProduct,updateProduct,deleteProduct,getProductDetail,addProductReview,getProductReview,deleteProductReview,upload}