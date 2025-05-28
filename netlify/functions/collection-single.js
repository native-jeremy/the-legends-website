require("dotenv").config();

exports.handler = async (event) => {
  const { collection, recordId } = event.queryStringParameters || {};
  const airtableBaseUrl = `https://api.airtable.com/v0/appFAv10or1mV1K9i/${collection}`;
  if (!collection) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Collection is required." }),
    };
  }

  try {
    if (event.httpMethod === "GET") {
      if (!recordId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Record ID is required for GET." }),
        };
      }

      const response = await fetch(`${airtableBaseUrl}/${recordId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`GET failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data.fields),
      };
    }

    const payload = JSON.parse(event.body);

    if (event.httpMethod === "POST") {
      const response = await fetch(airtableBaseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: Object.fromEntries(
            Object.entries(payload).map(([key, value]) => [key, Array.isArray(value) ? value : [value]])
          )
        })
      });

      if (!response.ok) {
        throw new Error(`POST failed: ${response.statusText}`);
      }

      const created = await response.json();
      return {
        statusCode: 201,
        body: JSON.stringify(created.fields),
      };
    }

    if (event.httpMethod === "PATCH") {
      if (!recordId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Record ID is required for PATCH." }),
        };
      }

      const response = await fetch(`${airtableBaseUrl}/${recordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: payload }),
      });

      if (!response.ok) {
        throw new Error(`PATCH failed: ${response.statusText}`);
      }

      const updated = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(updated.fields),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
