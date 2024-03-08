require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (event, context) => {
  const email = event.body;
  console.log('Email: ',email);

  // Stripe Checkout Session | V2 Server-Client Integration
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: 'price_1Os0SNBV1W2mjCG5MpAeNvNz',
      quantity: 1,
    }],
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 14,
    },
    customer_email: `${email}`,
    success_url: `http://localhost:8888/success.html?success&session_id={CHECKOUT_SESSION_ID}&userverfied=${email}`,
    cancel_url: "http://localhost:8888/",
  });

  // Create Customer
  /*const customer = await stripe.customers.create({
    name: 'Morgan Kenneth Brown',
    email: `${email}`,
  });*/

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
