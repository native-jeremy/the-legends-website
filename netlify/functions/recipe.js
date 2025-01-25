require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    // Parse the session ID from the request
    const { recordId } = JSON.parse(event.body);

    console.log('User ID:', recordId);

    // Send POST request to Airtable to create the new user
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/appFAv10or1mV1K9i/Users/${recordId}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Parse and log the Airtable response
    const airtableResult = await airtableResponse.json();
    console.log('Airtable Response:', airtableResult);

    // Respond to the client
    return {
      statusCode: 200,
      body: JSON.stringify({ airtableResult }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
