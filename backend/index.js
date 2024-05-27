import express  from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB  from "./database/connection.js";

import Product from "./route/productRoute.js";
import User from "./route/userRoute.js";
import Order from "./route/orderRoute.js";
import Payment from "./route/paymentRoute.js";

let app =express()
dotenv.config({path :'config.env'})

const port = process.env.PORT || 4000;
var key = process.env.STRIPE_SECRET_KEY

app.set('view engine','ejs')

connectDB()

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/',Product)
app.use('/',User)
app.use('/',Order)
app.use('/',Payment)

app.listen(port,()=>{
    console.log('server running')
})