require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // Parse the session ID from the request
    const { sessionId, recordId } = JSON.parse(event.body);

    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Extract the customer ID
    const customerId = session.customer;

    console.log('Stripe Customer ID:', customerId);

    // Prepare data to be sent to Airtable
    const userID = {
      records: [
        {
          id: recordId,
          fields: {
            Stripe_ID: `${customerId}`,
            Stripe: "Verified",
          },
        },
      ],
    };

    // Send POST request to Airtable to create the new user
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/appFAv10or1mV1K9i/Users/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userID),
      }
    );

    // Parse and log the Airtable response
    const airtableResult = await airtableResponse.json();
    console.log('Airtable Response:', airtableResult);

    // Respond to the client
    return {
      statusCode: 200,
      body: JSON.stringify({ customerId, airtableResult }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
