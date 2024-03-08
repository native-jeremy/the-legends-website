require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (event, context) => {
  //const data = JSON.parse(event.body);
  //const { Email, ID} = data;
  //console.log("Data", data);
  const email = "nativedev@gmail.com";
  //console.log('Email: ',email);

  // Stripe Checkout Session | V2 Server-Client Integration
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: 'price_1OPcLpIZH9zc1qV7NRXgQ8lQ',
      quantity: 1,
    }],
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 14,
    },
    allow_promotion_codes: true,
    //customer_email: `${email}`,
    success_url: `https://thelegendsprogram.com.au/thank-you.html?success&session_id={CHECKOUT_SESSION_ID}&userverified=${email}`,
    cancel_url: `https://thelegendsprogram.com.au/program-selection.html`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
