anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

window.onload = async () => {
  Wized.request.await("Load Users", (response) => {
    let snapshot = response.data;
    console.log("User Data: ", snapshot);
    let messagesRecieved = snapshot.General_Messages;
    let messagesRead = [];
    let messageButton = document.getElementById("message_button");
    if (snapshot.Read_Messages) {
      snapshot.Read_Messages.forEach((message) => {
        messagesRead.push(message);
      });
    }
    setTimeout(() => {
      const message = document.querySelectorAll(".message");
      const messageID = document.querySelectorAll(".id");
      const messageIcon = document.querySelectorAll(".message-icon");
      if (messagesRead.length > 0) {
        for (let i = 0; i < message.length; i++) {
          for (let n = 0; n < messagesRead.length; n++) {
            if (messagesRead[n].includes(messageID[i].textContent)) {
              messageIcon[i].classList.add("not_read");
            }
          }
        }
      }
      for (let i = 0; i < message.length; i++) {
        // Dynamic message
        let userName = message[i].innerHTML;
        userName = userName.replaceAll("NAME", snapshot.FirstName);
        let userProgram = userName;
        userProgram = userProgram.replaceAll(
          "PROGRAM",
          snapshot.Program_Name[0]
        );
        let personalText = userProgram;
        message[i].innerHTML = personalText;
        // Adding message to "readMessages" array
        message[i].addEventListener("click", () => {
          messageButton.style.display = "none";
          messagesRead.push(messageID[i].textContent);
          document
            .querySelectorAll(".message-icon")
            [i].classList.add("not_read");
          Wized.data.setVariable("messagelist", messagesRead);
          Wized.data.listen("v.messagelist", async () => {
            Wized.data.get("v.messagelist");
          });
          Wized.data.setVariable("readmessages", true);
        });
      }
    }, 1000);
  });
};

document.querySelector('.loading-state-v2').style.display = "none";
