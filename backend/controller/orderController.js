import Order from "../model/order.js";
import Product from "../model/product.js"

const newOrder = async(req,res)=>{
    
    try {
        const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}  = req.body
        console.log(req.body)
        
        req.body.user=req.user._id
        req.body.paidAt=Date.now()

        console.log(req.body)
        const order = await Order.create(
            req.body
        )

        res.status(201).send({ message: "order created" ,order})

    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while creating a order"
        })
    }
}

const singleOrder = async(req,res)=>{
    try {
        console.log('singleorder')
        const order = await Order.findById(req.params.id).populate("user","name email")
        console.log(order)
        if(!order) res.status(404).send({ message: "order not found" })
        res.status(201).send({ message: "order created" ,order})

    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while fetching an order"
        })
    }
}

// loggedin user order

const myOrder = async(req,res)=>{
    try {
        console.log(req.user.id)
        const order = await Order.find({ user: req.user.id })
        res.status(200).send(order)        

    } 
    catch (err) {
        res.status(404).send({
            message: err.message || "some error occur while fetching an order"
        })    
    }
}

const getOrders = async(req, res) => {
    try {
        const orders= await Order.find()
        const totalAmount = orders.reduce((acc,curr)=>{return acc+curr.totalPrice},0)

        res.status(200).send({order:orders,totalAmount:totalAmount});    
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while retrieving orders"
        })
    }  
    
};

const updateOrder = async(req, res) => {
    try {
        console.log(req.params.id)
        const order= await Order.findById(req.params.id)

        if(!order) res.status(404).send({ message: "order not found" })

        if (order.orderStatus === 'Delivered') return res.status(400).send('you have already delivered this order')
        
        order.orderItems.forEach(async (order) => {
            await stockUpdate(order.product,order.size,order.quantity)
        });

        order.orderStatus = req.body.status
        if(order.orderStatus === 'Delivered') order.deliveredAt = Date.now()

        await order.save({validateBwforeSave : false})

        res.status(200).send({message:"order status updated"});    
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while retrieving orders"
        })
    }  
    
};

async function stockUpdate(id,O_size,O_quantity){
    try {
            const product = await Product.findById(id)
        
            for (const variation of product.variation) {
                for (const size of variation.size) {
        
                    if (size.name === O_size){
                        size.stock -= O_quantity
                    }
                }
            }
            await product.save({ validateBeforeSave: false });
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while updating stock"
        })
    }

}


async function deleteOrder(req,res){
    try {
        console.log('delete controller')
        console.log(req.params.id)
        const order = await Order.findById(req.params.id)
        console.log(order)
        if(!order) return res.status(404).send({message:"no order found"})
        await Order.deleteOne({_id:req.params.id})
        res.status(200).send({message : 'order delete successfully'})


    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "some error occur while updating stock"
        })
    }

}




export {newOrder,singleOrder,myOrder,getOrders,updateOrder,deleteOrder}