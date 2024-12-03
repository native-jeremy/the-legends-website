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

        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
        });

        const hasActiveSubscription = subscriptions.data.length > 0;

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
