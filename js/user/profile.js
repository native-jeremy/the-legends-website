window.onload = async () => {
  Wized.request.await("Load Users", (response) => {
    const user = response.data;
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
    const userName = document.getElementById("username");
    userName.innerHTML = user.FirstName + " " + user.LastName;
  });
};
