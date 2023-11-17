window.onload = async () => {
    const userId = localStorage.getItem('siren');
    console.log('UserID: ', userId);
    const mainBtn = document.getElementById('mainBtn');

    if(userId !== undefined || userId !== null || userId !== '')
    {
        mainBtn.href = "/program-hub-welcome.html";
        mainBtn.textContent = "Home";
    }
    else if (userId == undefined || userId == null || userId == '') {
        mainBtn.textContent = "Login";
    }
  };