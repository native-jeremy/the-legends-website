require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (event) => {
    try {
        const customerId = event.queryStringParameters.customerId;

        if (!customerId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Customer ID is required.' }),
            };
        }

        // Fetch all subscriptions for the customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
        });

        // Check if any subscription is active or trialing
        const hasActiveSubscription = subscriptions.data.some(
            (sub) => sub.status === 'active' || sub.status === 'trialing'
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ hasActiveSubscription }),
        };
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
