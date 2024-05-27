import User from "../model/user.js";

import Token from "../utils/jwtToken.js";


const registeruser = (req,res)=>{
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" })
        return;
    }
    const user = new User(req.body)

    // save user in database
    user
        .save(user)
        .then(data => {
            Token(data,201,res,"user created successfully")

        })
        .catch(err => {
            if(err.message==='E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "hk@user.com" }'){
                err.message = 'email already taken'
            }
            res.status(500).send({
                message: err.message || "some error occur while creating/registering  a user"
            })
        })
}

const loginuser = async(req, res) => {
    
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) return res.status(400).json({ 'message': 'email and password are required.' });
        
        const user  =await  User.findOne({email}).select("+password")
    
        if(!user) return res.status(401).json({ 'message': 'invalid email or password' });
        const isPasswordMatched = await user.comparePassword(password);

        console.log(isPasswordMatched)
        if(!isPasswordMatched){
            return res.status(401).json({ 'message': 'invalid email or password' });
        }
        Token(user,200,res,"user login successfully")
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error login"
        })
    }
    

};

const logoutuser=(req,res)=>{
    try {
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
        })
    
        res.status(200).send(
            {
                "message":"logout successful"
            }
        )
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error logout"
        })
    }
}

const userDetail = async (req,res)=>{
    const user =await User.findById(req.user.id)
    res.status(200).send({"message":"user detail fetched",user})
}


const passwordUpdate = async(req,res)=>{

    
    try {
        const user = await User.findById(req.user.id).select("+password")
        const {oldPassword,newPassword,confirmPassword} = req.body
        if(!oldPassword || !newPassword || !confirmPassword) return res.status(400).json({ 'message': ' passwords are required.' });
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
        if(!isPasswordMatched){
            return res.status(401).json({
                "message":"old password is incorrect"
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(401).json({
                "message":"password and confirm password does not match"
                })
        }
        user.password = newPassword;
        await user.save();
        sendToken(user, 200, res,'password update succesfully');
    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "some error while changing password"
        })
    }
}


const profileUpdate = async (req,res)=>{

    try {

        const userDetail = {
            name: req.body.name,
            email:req.body.email,
            role:'user'
        }

        const user = await User.findByIdAndUpdate(req.user.id, userDetail, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        
        res.status(200).send({
            message: 'user profile updated',
            user
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error while updating profile"
        })
    }
}

const allUser=async(req,res)=>{

    try {
        const Users = await User.find()
        res.status(200).json({
            message: 'users fetched',Users
        });
    }

    catch (error) {
        res.status(500).send({
            message: error.message || "some error while getting users"
        })
    }
}

const singleUser = async(req,res)=>{
    try {
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        console.log(user)

        if(!user)  return res.status(404).send({message:"no user found"})
        res.status(200).send({ message: "order created" ,user})

    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "some error while getting user detail"
        })
    }
}



const UpdateRole = async (req,res)=>{

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            useFindAndModify: false,
        });
        
        res.status(200).json({
            message: 'user profile updated',user
        });
    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "some error while updating profile"
        })
    }
}

const deleteUser = async(req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        if(!user) res.status(500).send({ message: "product not found" })
        await user.deleteOne({id:req.params.id})
        res.status(200).json({message:'user deleted'})
    } 
    catch (error) {
        res.status(500).send({
            message: error.message || "some error while deleting profile"
        })
    }
}

export {registeruser,loginuser,logoutuser,userDetail,passwordUpdate,profileUpdate,allUser,singleUser,UpdateRole,deleteUser}