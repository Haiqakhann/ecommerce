import jwt from "jsonwebtoken"
import User from "../model/user.js"

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies
    if(!token) {
        return res.status(401).send('please login to access this resource')
    }
    try {
      const data = jwt.verify(token,process.env.JWT_SECRET)
  
      req.user = await User.findById(data.id)
      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Session expired. Please login again.');
    } else {
        return res.status(401).send('Invalid token. Please login again.');
    }
    }
}


export const isAuthorized = (...roles)=>{

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
          return next(
            res.status(401).send('you are not allowed to access this resource')
          );
        }
    
        next();
      };
    
}

