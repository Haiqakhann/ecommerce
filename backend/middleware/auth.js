import jwt from "jsonwebtoken"
import User from "../model/user.js"

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies
    if(!token) {
        return res.status(401).send('please login to access this resource')
    }
    const data = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(data.id)
    next()
}


export const isAuthorized = (...roles)=>{

    return (req, res, next) => {
        console.log(req.user.role)
        if (!roles.includes(req.user.role)) {
          return next(
            res.status(401).send('you are not allowed to access this resource')
          );
        }
    
        next();
      };
    
}

