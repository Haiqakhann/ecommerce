import Stripe from "stripe";

const paymentProcess = async(req,res)=>{
    try {

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "pkr",
            metadata: {
              company: "Ecommerce",
            },
        });
        res.status(200).json({ success: true, client_secret: myPayment.client_secret });       
    
    } 
    catch (err) {
        res.status(500).send({
            message: err.message || "error while processing payment"
        })    
    }
}

const stripeApikey = async(req,res)=>{
    try{
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "error while sending api key"
        })    
    }
}

export{paymentProcess,stripeApikey}