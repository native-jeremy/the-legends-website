window.onload = async () => {
    const userId = localStorage.getItem('recpies_stored');
    console.log('UserID: ', userId);
    const mainBtn = document.getElementById('mainBtn');

    if(!userId)
    {
        mainBtn.href = "/program-hub-welcome.html";
        mainBtn.textContent = "Home";
    }
    else if (userId) {
        mainBtn.textContent = "Login";
    }
  };