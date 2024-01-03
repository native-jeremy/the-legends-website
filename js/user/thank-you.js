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
  
// Tapfiliate
(function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){
(t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');

tap('create', '47544-528ca5', { integration: "stripe" });
tap('trial', 'STRIPE CUSTOMER ID');
 
// Loader turn off
setTimeout(() => {
  document.querySelector('.loading-state-v2').style.display = "none"
}, 2000);
  