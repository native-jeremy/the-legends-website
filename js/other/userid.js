window.onload = async () => {
    const userId = await Wized.data.get('c.userid');
    //console.log('UserID: ', userId);
    const mainBtn = document.querySelectorAll('.header_main_secondary_button');

    if(userId !== undefined)
    {
        mainBtn.forEach((button) => {
            button.href = "/program-hub-welcome.html";
            button.textContent = "Home";
            //console.log('Home');
        });
    }
    else {
        mainBtn.forEach((button) => {
            button.textContent = "Login";
            //console.log('Login');
        });
    }
  };