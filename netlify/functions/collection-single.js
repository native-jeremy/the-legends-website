require("dotenv").config();

exports.handler = async (event) => {
  try {
    // Parse recordId from query parameters
    const {collection, recordId } = event.queryStringParameters || {};

    if (!collection && !recordId) {
      throw new Error("Collection and Record ID is missing.");
    }

    console.log("Received ID:", recordId);

    // Fetch collection Item from Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/appFAv10or1mV1K9i/${collection}/${recordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching Collection Item: ${response.statusText}`);
    }

    const resultJson = await response.json();
    console.log("Result:", resultJson);

    const result = resultJson.fields

    // Respond with combined data
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
