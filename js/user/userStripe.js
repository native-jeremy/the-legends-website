window.onload = async () => {
  Wized.request.await("Load Users", (response) => {
    const snapshot = response.data;
    const stripeID = snapshot.Stripe_ID || null;

    // Stripe Subscription Status Check
    checkStripeSubscription(stripeID);
    
    if (snapshot.Stripe == "Not Verified") {
      checkPage(window.location.pathname);
    } else {
      const messageButton = document.querySelector(".icon_1");
      const messageButtonBurger = document.querySelector(".icon_2");
      let messagesRecieved = snapshot.General_Messages;
      let messagesRead = [];
      if (snapshot.Read_Messages) {
        snapshot.Read_Messages.forEach((message) => {
          messagesRead.push(message);
        });
      }
      if (messagesRecieved.length > messagesRead.length) {
        messageButton.style.display = "flex";
      } else {
        messageButton.remove();
        messageButtonBurger.remove();
      }
    }
  });
  Wized.request.await("Load Users Program Hub", (response) => {
    const snapshot = response.data;
    if (snapshot.Stripe == "Not Verified") {
      checkPage(window.location.pathname);
    } /*else {
      const messageButton = document.querySelector(".icon_1");
      const messageButtonBurger = document.querySelector(".icon_2");
      let messagesRecieved = snapshot.General_Messages;
      let messagesRead = [];
      if (snapshot.Read_Messages) {
        snapshot.Read_Messages.forEach((message) => {
          messagesRead.push(message);
        });
      }
      if (messagesRecieved.length > messagesRead.length) {
        messageButton.style.display = "flex";
      } else {
        messageButton.remove();
        messageButtonBurger.remove();
      }
    }*/
  });
  /*Wized.request.await("Load Users Program", (response) => {
    const snapshot = response.data;
    if (snapshot.Stripe == "Not Verified") {
      checkPage(window.location.pathname);
    } else {
      const messageButton = document.querySelector(".icon_1");
      const messageButtonBurger = document.querySelector(".icon_2");
      let messagesRecieved = snapshot.General_Messages;
      let messagesRead = [];
      if (snapshot.Read_Messages) {
        snapshot.Read_Messages.forEach((message) => {
          messagesRead.push(message);
        });
      }
      if (messagesRecieved.length > messagesRead.length) {
        messageButton.style.display = "flex";
      } else {
        messageButton.remove();
        messageButtonBurger.remove();
      }
    }
  });*/

function checkStripeSubscription(customerId) {
  if (customerId) {
    fetch(`/api/checkSubscription?customerId=${encodeURIComponent(customerId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if(data.hasActiveSubscription) {
          //console.log("Active subscription");
        }
        else {
          window.location.href = "../login";
        }
      })
      .catch((error) => {
        console.error("Fetch operation failed:", error.message);
      });
  } else {
    //console.warn("No Stripe ID found, redirecting to login.");
    window.location.href = "../login";
  }
}

function checkPage(page) {
  // Check if the current page URL does not include "/program-selection"
  if (!page.includes("/program-selection") || !page.includes("/thank-you")) {
    // Redirect to "/program-selection" if the condition is met
    window.location.href = "/program-selection";
  }
}  
};
