require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async(event) => {
    try{
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            description: "Testing a react application",
            "shipping[name]" : "Jenny Rosen" ,
            "shipping[address][line1]" : "510 Townsend St" ,
            "shipping[address][postal_code]" : 98140 ,
            "shipping[address][city]" : "San Francisco" ,
            "shipping[address][state]" : "CA" ,
            "shipping[address][country]" : "US" ,
            payment_method_types: ["card"]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }
    }catch(error) {
        console.log({error});

        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}