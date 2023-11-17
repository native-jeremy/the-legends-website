window.onload = async () => {
    const userId = JSON.parse(localStorage.getItem('recpies_stored'));
    console.log('UserID: ', userId);
    const mainBtn = document.getElementById('mainBtn');

    if(userId !== true)
    {
        mainBtn.href = "/program-hub-welcome.html";
        mainBtn.textContent = "Home";
    }
    else if (userId == true) {
        mainBtn.textContent = "Login";
    }
  };