const wizedUserId = getCookie('wized_userid');
console.log('Wized User ID:', wizedUserId);

checkUser(wizedUserId);

function checkUser(recordId) {
    if (customerId) {
      fetch(`/api/recipe?recordId=${encodeURIComponent(recordId)}`, {
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

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null; // Return null if the cookie is not found
}