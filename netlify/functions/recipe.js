require("dotenv").config();

exports.handler = async (event) => {
  try {
    // Parse recordId and userId from query parameters
    const { recordId, userId } = event.queryStringParameters || {};

    if (!recordId || !userId) {
      throw new Error("Record ID or User ID is missing.");
    }

    console.log("Received Recipe ID:", recordId);
    console.log("Received User ID:", userId);

    // Fetch user details from Airtable
    const userResponse = await fetch(
      `https://api.airtable.com/v0/appFAv10or1mV1K9i/Users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Error fetching user: ${userResponse.statusText}`);
    }

    const userResult = await userResponse.json();
    //console.log("User Data:", userResult);

    // Check subscription status
    const hasActiveSubscription = !!userResult.fields?.subscriptionActive;

    /*if (!hasActiveSubscription) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "User does not have an active subscription." }),
      };
    }*/

    // Fetch recipe details from Airtable
    const recipeResponse = await fetch(
      `https://api.airtable.com/v0/appFAv10or1mV1K9i/Recipes/${recordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!recipeResponse.ok) {
      throw new Error(`Error fetching recipe: ${recipeResponse.statusText}`);
    }

    const recipeResult = await recipeResponse.json();
    console.log("Recipe Data:", recipeResult);

    // Combine user and recipe data
    const combinedData = {
      user: userResult.fields,
      recipe: recipeResult.fields,
    };

    // Respond with combined data
    return {
      statusCode: 200,
      body: JSON.stringify(combinedData),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
