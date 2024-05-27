const Token = async (user,statuscode,res,Message)=>{
    const token = user.getJwtToken()
    //options for cookie
    const options ={
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }
    res.status(statuscode)
        .cookie('token',token,options)   
        .send({
            message: Message,
            user,
            token
        })
}

export default Token