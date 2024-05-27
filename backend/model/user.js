import mongoose from "mongoose";

import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

var schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please enter your name'],
        maxLength : [20, "name cannot exceed 20 characters"],
        minLength : [4,"name should have more than 4 characters"]
    },
    email: {
        type: String,
        require: [true,"please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        require: [true,"please enter your password"],
        minLength : [8, "password should have atleast 8 characters"],
        //    this is for hashing the password
        select: false
    },
    role:{
        type: String,
        default: "user"
    }
})


schema.pre('save',async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)    
})

schema.methods.getJwtToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
}

schema.methods.comparePassword = async function(enteredPassword){
    console.log(this.password)
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', schema)
export default User;