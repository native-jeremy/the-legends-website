window.onload = async () => {
  Wized.request.await("Load Users", (response) => {
    const snapshot = response.data;
    console.log("Snapshot", snapshot)
    // Stripe Subscription status check
    checkStripeSubscription(snapshot.Stripe_ID);
    
    if (snapshot.Stripe == "Not Verified") {
      window.location.href = "/program-selection";
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
      window.location.href = "/program-selection";
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
  Wized.request.await("Load Users Program", (response) => {
    const snapshot = response.data;
    if (snapshot.Stripe == "Not Verified") {
      window.location.href = "/program-selection";
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

  function checkStripeSubscription(customerId) {
    fetch(`/api/checkSubscription?customerId=${encodeURIComponent(customerId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        console.log("Stripe Status Data", data)
        console.log("Subscription Status:", data.hasActiveSubscription);
      })
      .catch(function (error) {
        console.error("There was a problem with the fetch operation:", error);
      });
    
  }
};
