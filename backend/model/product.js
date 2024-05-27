import mongoose from "mongoose";

var variation = new mongoose.Schema({
    size:[
        {
            name: { 
                type: String, 
                required: [true, "Please Enter product Name"] 
            },
            stock: {
                type: Number, 
                required: [true, "Please Enter product Name"]
            }
        }
    ]
})

var schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter product Name"],
    },
    description: {
        type: String,
        require: [true, "Please Enter product Description"],
    },
    image: {
        type: String,
        require: [true, "Please Enter product Image"],
    },
    new:{
        type:Boolean,
        default:true
    },
    popular:{
        type:Boolean,
        default:true
    },
    category: {
        type: String,
        require: [true, "Please Enter product category"],
    },
    subCategory: {
        type: String,
        require: [true, "Please Enter product sub category"],
    },
    price: {
        type: Number,
        require: [true, "Please Enter product price"],
    },
    variation:[variation],
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
      },
    reviews: [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"USER",
                required:true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],  
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"USER",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

})
const Product = mongoose.model('Product', schema)
export default Product;
