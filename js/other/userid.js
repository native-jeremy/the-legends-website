window.onload = async () => {
    const userId = await Wized.data.get('c.userid');
    console.log('UserID: ', userId);
    const mainBtn = document.getElementById('mainBtn');

    if(userId !== undefined || userId !== null || userId !== '')
    {
        mainBtn.href = "/program-hub-welcome.html";
        mainBtn.textContent = "Home";
    }
    else {
        mainBtn.textContent = "Login";
    }
  };