// Animation for loader
anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });

  applyStripeID();
 
// Loader turn off
setTimeout(() => {
  document.querySelector('.loading-state-v2').style.display = "none"
}, 2000);
  

// Extract the session ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');

function applyStripeID() {
  // Extract the session ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  // Helper function to get the value of a specific cookie
  function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  }

  function applyRedirect() {
    setTimeout(() => {
      const text = document.querySelector('p')
      text.textContent = "Redirecting to home page...";
    }, 5000);

    setTimeout(() => {
      window.location.href = "/program-hub-welcome.html";
    }, 10000);
  }

  // Get the value of the "wized_userid" cookie
  const recordId = getCookieValue('wized_userid');
  console.log(recordId);

  if (sessionId) {
    // Send the session ID to the Netlify function
    fetch('/api/retrieveSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, recordId }),
    })
      .then((response) => response.json())
      .then((data) => {
        (function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){
          (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');
      
          tap('create', '47544-528ca5', { integration: "stripe" });
          tap('trial', `${data.customerId}`);

          // setTimeout Redirect
          applyRedirect();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}