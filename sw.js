if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let d={};const o=e=>s(e,c),n={module:{uri:c},exports:d,require:o};i[c]=Promise.all(r.map((e=>n[e]||o(e)))).then((e=>(a(...e),d)))}}define(["./workbox-fb5f92e2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"90931755fcecc816202601d5a9772cdc"},{url:"about.html",revision:"f0928aeb97374be0c7c3732c6d154005"},{url:"account.html",revision:"1286b6f9a7bed2c95c53e9ce5f7c782e"},{url:"blog-library.html",revision:"b148caf0b4be95eb79a9e46a1b694a7f"},{url:"blog-post.html",revision:"a3647e2577324adb26b058667086a78d"},{url:"blog.html",revision:"4a88fa0a53008945cefec6a4546b9236"},{url:"blogs.html",revision:"ae22a8befcbeb6b85fb11cee30041341"},{url:"change-password.html",revision:"66c45bf97a52cb3220e330b31d00852f"},{url:"css/components.css",revision:"6451b27c181ca00de8ccba5d14ed3c47"},{url:"css/normalize.css",revision:"afb4942e5838a7dc3b63d00ffcc87c9d"},{url:"css/the-legends-web-app.css",revision:"f7c71191f25dbd2ba0afbf5d19301d0b"},{url:"css/the-legends-web-app.min.css",revision:"70aa7ddba91c7404b65530f7d94ad5ca"},{url:"guides-library.html",revision:"bd8eafc0b6c200f6e154fc4c3d156168"},{url:"guides.html",revision:"1f2ec7970d7aaea7aea64b02bf160c2a"},{url:"images/favicon.ico",revision:"d60bf02b20aa7ac21d43fe7ecd905e2f"},{url:"images/icons/icon-128x128.png",revision:"fd473c0a7165cf00a27e576c0303f7e8"},{url:"images/icons/icon-144x144.png",revision:"3daaca8a4e5873975bf85d427b98984e"},{url:"images/icons/icon-152x152.png",revision:"8ddae7874afbe546cdf47ddb6346e5a7"},{url:"images/icons/icon-192x192.png",revision:"b696a4780f5c2fc07fc4fcd6fa25eb4c"},{url:"images/icons/icon-384x384.png",revision:"8e25885c630cfdc545f5d500760bd6d5"},{url:"images/icons/icon-512x512.png",revision:"5b061eefb7a6762e839693c9e381dd19"},{url:"images/icons/icon-72x72.png",revision:"a4ee294c5da28b3c39fffae320193fd1"},{url:"images/icons/icon-96x96.png",revision:"db6558a954bbd36248cea75401e431c1"},{url:"images/iphone_mock_base_image-p-500.jpg",revision:"872808f628c58ffe9d97af84e92084a0"},{url:"images/iphone_mock_base_image-p-800.jpg",revision:"cb9b291266ca3187a6a03bc14dc0bc05"},{url:"images/iphone_mock_base_image.jpg",revision:"726ca4aa7e32ddb3009e3b2c7864766b"},{url:"images/native-design_agency-logo_native-black.svg",revision:"137cb0120b2585ab893eb3d8e8f12b2b"},{url:"images/the_legends-alert_indicator-green.svg",revision:"015a9e183b666836f9e4901c4dd32fae"},{url:"images/the_legends-alert_indicator-red.svg",revision:"3c6508e027985c7974b7e708f32f33f6"},{url:"images/the_legends-arrow_small-left-black.svg",revision:"ff6c78e358f5e15b0844a61fc91d67f5"},{url:"images/the_legends-arrow_small-right-black.svg",revision:"4d1e117bf84812fe686caf9496c0ec78"},{url:"images/the_legends-arrow-down-black.svg",revision:"1671737c01ce2d523f86411748867849"},{url:"images/the_legends-arrow-green.svg",revision:"4ae651b88f110817291127258bdf2342"},{url:"images/the_legends-arrow-left-white.svg",revision:"420bf2189c3b6fcfddd840e9256ebe6c"},{url:"images/the_legends-arrow-right-white.svg",revision:"85539230706666bdd28b883c63871bb9"},{url:"images/the_legends-arrow-up-white.svg",revision:"64b78f7dd27f6a6bc730e90e3b240420"},{url:"images/the_legends-award_badge-complete-green.svg",revision:"35e0c3701a3b3ea0548b81980f2296e9"},{url:"images/the_legends-burger_drop_down-eat-white.svg",revision:"85f0bce53cd0ecda81e742868ecefa7d"},{url:"images/the_legends-burger_drop_down-gym-white.svg",revision:"c311ee8b47d8b143cc3293d3e6a2d448"},{url:"images/the_legends-burger_drop_down-inbox-white.svg",revision:"14891cb0ececcafee7807fcbce961e27"},{url:"images/the_legends-burger_drop_down-learn-white.svg",revision:"e7e6480906893c2821ad04a2fb45ea9f"},{url:"images/the_legends-burger_drop_down-profile-white.svg",revision:"1551875eedeb8ee4c9544e87e5357176"},{url:"images/the_legends-edit_text-grey.svg",revision:"adff1b904f615dae7c61127231dabaea"},{url:"images/the_legends-facebook-logo_gem-white.svg",revision:"eabb7e9a4eaece069c070dd7eeee3da6"},{url:"images/the_legends-filter-black.svg",revision:"39679a4a1556203f9682955f9db97d5d"},{url:"images/the_legends-hero_image-p-1080.jpg",revision:"a8f983ba91513d7e2f987288a54e6b3a"},{url:"images/the_legends-hero_image-p-1080.png",revision:"f8a2fd5d81363c77d52904eb329dfc65"},{url:"images/the_legends-hero_image-p-1600.jpg",revision:"d7d1e3cdfeb67962fd14e25f8c17fb3f"},{url:"images/the_legends-hero_image-p-1600.png",revision:"8a88306028558da3087e8cac0955553f"},{url:"images/the_legends-hero_image-p-2000.jpg",revision:"3b8ef99accd5621a0e98c61df71d6995"},{url:"images/the_legends-hero_image-p-2000.png",revision:"9d8bcd83e4236a71e918fcb73bbe6870"},{url:"images/the_legends-hero_image-p-2600.jpg",revision:"c2504252caf22035231a8b6258d09040"},{url:"images/the_legends-hero_image-p-2600.png",revision:"8300cca37ac2a80a3190870fa23f44bd"},{url:"images/the_legends-hero_image-p-3200.jpg",revision:"af3f6737e258aaa2998c777f77a91dd1"},{url:"images/the_legends-hero_image-p-500.jpg",revision:"72989579593330f09e1dce1fe8e1b930"},{url:"images/the_legends-hero_image-p-500.png",revision:"77f86a0b3caec5a8d0d1e6fe74cd2869"},{url:"images/the_legends-hero_image-p-800.jpg",revision:"e61ad6d22be398493f180f6fbe5b7ddc"},{url:"images/the_legends-hero_image-p-800.png",revision:"c1e8bad42997e0ae711e707307408e01"},{url:"images/the_legends-hero_image.jpg",revision:"dd49f0536045f2beb9d647c86915c47c"},{url:"images/the_legends-hero_image.png",revision:"29833d825274d50ad2ee58c300ca7939"},{url:"images/the_legends-instagram-logo_gem-white.svg",revision:"2fac2f411f9e2d7229561e9ee035bb65"},{url:"images/the_legends-iphone-svg.svg",revision:"ea009349a91d1b9dab7f7e880327b694"},{url:"images/the_legends-landing_menu_select-gym-green.svg",revision:"9cfa3ed7e5ab125c3da8dfb63deba803"},{url:"images/the_legends-landing_menu_select-inbox-green.svg",revision:"a4d10aa27aed6b7515c841cfb4347c7d"},{url:"images/the_legends-landing_menu_select-profile-green.svg",revision:"c7800a9f01abec6bf9f84806692885e3"},{url:"images/the_legends-landing-hero-1-p-1080.png",revision:"0520f0eb43833f08da6bda29183112dd"},{url:"images/the_legends-landing-hero-1-p-130x130q80.png",revision:"0c2c5acebc3834ae24a1648bc29d94ed"},{url:"images/the_legends-landing-hero-1-p-1600.png",revision:"9421d87afa76161809ec2a8f3a0ed495"},{url:"images/the_legends-landing-hero-1-p-500.png",revision:"65e6703c333fc7c249633fe58f2a9832"},{url:"images/the_legends-landing-hero-1-p-800.png",revision:"8b4a8b5ca2be7bcc50755aed58a06bec"},{url:"images/the_legends-landing-hero-1.png",revision:"b3385091c72461e3d9c5f6c765f09b27"},{url:"images/the_legends-load_wheel-white.svg",revision:"450d521517e0b81799994c92b4190c8b"},{url:"images/the_legends-logo-black.svg",revision:"8453ea98aaadd13999aff9714286725f"},{url:"images/the_legends-logo-green_1.svg",revision:"a809e323d9fe1f97e02a598b46e4e793"},{url:"images/the_legends-logo-green_rotated.svg",revision:"4a29c9c12ce4b4580625199b287fcffe"},{url:"images/the_legends-logo-green.svg",revision:"f96c141cf0de064434292496fce7bc43"},{url:"images/the_legends-logo-white.svg",revision:"2379c12675a1ad295d5a2705cc4ddb22"},{url:"images/the_legends-native_design_agency-logo-white.svg",revision:"b1e1400d7183f82f64b6c062daea692a"},{url:"images/the_legends-nav-award-green.svg",revision:"a48a0f7434a9fa600eb8a40e8852f834"},{url:"images/the_legends-nav-eat-green.svg",revision:"a0668db4b215f984eb8406fe931934a4"},{url:"images/the_legends-nav-learn-green.svg",revision:"e94cb779c8c8a5b5c6a2d3b3073befd6"},{url:"images/the_legends-scroll-icon.svg",revision:"fd206274ea39e99e58917af1276460e1"},{url:"images/the_legends-search-black.svg",revision:"a8287a7eac2ba5231ab6aaaa18258a19"},{url:"images/the_legends-status_circle-complete-green.svg",revision:"5e8292487ee9528753e29e50f68f51d9"},{url:"images/the_legends-status_indicator-off-grey.svg",revision:"2c9919ec55cdbb9aad4af832c858286c"},{url:"images/the_legends-status_indicator-on-green.svg",revision:"d4f10aa88a8d7354d648f2831f8f525a"},{url:"images/the_legends-tick-circle-green.svg",revision:"6b06204cd628074271561fa343f215de"},{url:"images/the_legends-tick-green.svg",revision:"cd300b4985194bec2b9f249751f2d90c"},{url:"images/the_legends-tick-white.svg",revision:"623ee0d9dfd51c0dc12df9f87201e44a"},{url:"images/the_legends-workout-audio-white.svg",revision:"3d5d302f0208da340ba38628eeefa5e8"},{url:"images/the_legends-workout-back-white.svg",revision:"a6c7c96417c59cc03abce4fae25bfe26"},{url:"images/the_legends-workout-cog-white.svg",revision:"bf4a629350bbc265550fdbf0b6c7ddfd"},{url:"images/the_legends-workout-exercise_level-white.svg",revision:"2dc1e9e50b2a8f9bec9b5b83e4ce2bc8"},{url:"images/the_legends-workout-forward-white.svg",revision:"e30a48c9eeb52c0953b552a20e6cf087"},{url:"images/the_legends-workout-pause-white.svg",revision:"8281313dee27943657262d0c47eded84"},{url:"images/the_legends-workout-play-white.svg",revision:"23dd899364407794a09ea0d883d3f5fd"},{url:"images/the-farm-shed-facebook-black.svg",revision:"35d5f66e772b4cd1208404e26c2a07e5"},{url:"images/the-farm-shed-instagram-black.svg",revision:"8d800f0e2f009cdf30b432fccbd636d9"},{url:"images/webclip.png",revision:"c0e9ddd052df2341189fab1caedfbeb5"},{url:"images/webclip.svg",revision:"a390f463e0cd51ba338b7d1cad9ae81d"},{url:"index.html",revision:"07a27a30b0a6273cd68d6a98074ba66a"},{url:"js/blogs/blog-library.js",revision:"56204b5ed8d69960c2b5a6111833eb45"},{url:"js/guides/guides-library.js",revision:"de2e6c6cb721adb32ec6179a77f73d95"},{url:"js/guides/guides.js",revision:"dcca6f311152de8f3ae6e8d1b6a9e1c7"},{url:"js/other/about.js",revision:"8ba011ef6c4b2e132544e01f73aec747"},{url:"js/other/audio-controls.js",revision:"1643f389b7130254632ab0b9fee202fc"},{url:"js/other/home.js",revision:"58805e9d5774035c12a12fdc754c9e29"},{url:"js/other/learning-hub.js",revision:"56480ae1ad8654dcc1f510afd6b9dc6a"},{url:"js/other/misc.js",revision:"cb3e05397a53e7d823ea0f0fb0510b97"},{url:"js/other/userid.js",revision:"cdb1697e2e9e4d9c6f948ac2bdfab532"},{url:"js/programs/program-hub-backup.js",revision:"2e50d33bbd94e61910da3ca715be38fb"},{url:"js/programs/program-hub-welcome.js",revision:"80d07fcb66ba0d2dc34faddba0a5e2cc"},{url:"js/programs/program-hub.js",revision:"553e9fc955c713905839d35b86094a91"},{url:"js/programs/program-selection.js",revision:"c0f653e55d892e714df8b0fe5076469a"},{url:"js/programs/program.js",revision:"2d9d88f5ac76b2e391634e58d837d4ef"},{url:"js/programs/programs.js",revision:"e6f859b3c5a5eb4632b0fda5f9b467b9"},{url:"js/questionnaire/questionnaire-default.js",revision:"8dcd52a68940aee1a09e5d84f67d1bf7"},{url:"js/questionnaire/questionnaire-update.js",revision:"01ea525a838b73c50e7fdb66a16e7c81"},{url:"js/recipes/check.js",revision:"00cebb5cbcbb600d68b29b986594836d"},{url:"js/recipes/recipe-hub-v1.js",revision:"ce49825fd9bb7372e65166e174bf6ec9"},{url:"js/recipes/recipe-hub.js",revision:"69f7652e05a41535a4457faa3a85c369"},{url:"js/recipes/recipe-library.js",revision:"2418fe08de252297313cb067c0cc19ab"},{url:"js/recipes/recipe.js",revision:"c282c71580881f3fa241c2973e6249bf"},{url:"js/recoveries/recovery-overview.js",revision:"baea3d288c6314d28cce4db56570784f"},{url:"js/recoveries/recovery.js",revision:"dedcb4fc491a35af0d820eae1777fb3f"},{url:"js/the-legends-web-app.js",revision:"764ab6f36db121cead2e7ba0326f2d9f"},{url:"js/tutorials/tutorial-library.js",revision:"ac3e229847e9739b033f5f1881c9d022"},{url:"js/tutorials/tutorial.js",revision:"6b43990d53cd3aca67a0ca970dad3e87"},{url:"js/user/login.js",revision:"fde63883911783efe0c09df8d9725099"},{url:"js/user/messages.js",revision:"70c9a33290596c717a927ea0e72a89f8"},{url:"js/user/password-reset.js",revision:"edfdebed932346c2b6dfe1b3c59f35d1"},{url:"js/user/preferences.js",revision:"149bd5952c5411ec7471c7704fd1130a"},{url:"js/user/profile-details.js",revision:"a26063f24e39cc964921d7bff849f2a7"},{url:"js/user/profile.js",revision:"ae0dcadb08a71a02d780c2b38d3ee814"},{url:"js/user/progress.js",revision:"0d9e39680d4fe03f548737078599e6a5"},{url:"js/user/signup.js",revision:"16200a65bb5fb1c087636c7e7143deaa"},{url:"js/user/thank-you.js",revision:"651cf52216c5d5e2aad24e60c717ca7b"},{url:"js/user/userStripe.js",revision:"eb596991e80cd04d1f5fc15e33560a4c"},{url:"js/workouts/json.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"js/workouts/workout-library.js",revision:"c589b99811d84f184794dd43188dfec0"},{url:"js/workouts/workout-new.js",revision:"20b60db963ae577e90a1b0fb7a95d47c"},{url:"js/workouts/workout-overview.js",revision:"24ff179602208be51a9d32ad08a37d11"},{url:"js/workouts/workout.js",revision:"6a0f24d8e9b8be668790c91181dc9993"},{url:"learning-hub.html",revision:"62861a23517e9a5862d1ec508d46969b"},{url:"login.html",revision:"3927c4695469f1e2687c0098d797c66d"},{url:"messages.html",revision:"b1e01ab449335b47ff6bb8f5c7a4499c"},{url:"netlify/functions/checkSubscription.js",revision:"5718023ed3f7a81c62d7ac8b1f500dea"},{url:"netlify/functions/stripe.js",revision:"a935e2e7056696c63c1fe9b92a80bb45"},{url:"password-reset.html",revision:"7076c4680cf0a5adc4e2fb55046ee69e"},{url:"preferences.html",revision:"a7db8a66744c0dc4edb3ba211ca6bdee"},{url:"privacy-policy-2023.html",revision:"00cd4770410091f71780ec83a7d0d6d7"},{url:"privacy-policy.html",revision:"b6366833a9e16313055cb5600c2e7996"},{url:"profile-details.html",revision:"6881f0934e477f78093f9879db217ffc"},{url:"profile.html",revision:"52bb69262a2d196db0cdba7180133ce7"},{url:"program-hub-welcome.html",revision:"b1b832c47b0563df7a7363d7b9f6ac9c"},{url:"program-hub.html",revision:"7b181b2d839069403e72817805aa76f6"},{url:"program-selection.html",revision:"d37e5373a381415678cf80171a8dc568"},{url:"program.html",revision:"a4b5f9cdad5be1560f4eda81c4b78955"},{url:"programs.html",revision:"976798c02c2821a1dca422a773718193"},{url:"progress.html",revision:"f376c1d142f279b5fba69e1096f86924"},{url:"questionnaire-update.html",revision:"d4ae83532ee900d41a559e5c09e3eccc"},{url:"questionnaire.html",revision:"0fa99d01cddfd0f0d19e332d21ed4263"},{url:"recipe-hub.html",revision:"8d142574ecc6852acf37b298f1dfce58"},{url:"recipe-library.html",revision:"28ead8923e7725e2926a499637a07acb"},{url:"recipe.html",revision:"35aab86d1a320ed2d56f3bfc49dd3d8b"},{url:"recovery-overview.html",revision:"2a0509c9524c0738e038ff6034cfec38"},{url:"recovery.html",revision:"eb62c87ec904697d6e7a2606922e1424"},{url:"sal/sal.css",revision:"52a59aec6a039d7d34fbd54ac47086a5"},{url:"sal/sal.js",revision:"572db03343fceb77c52f0f5baef21655"},{url:"signup.html",revision:"cd0bbe6a679e90db6cd6c5bdc293eca2"},{url:"support.html",revision:"5553abc1e565453fa3824a8c3d80f445"},{url:"thank-you.html",revision:"5901085c57bb41a899a10f48981c16e4"},{url:"tutorial-library.html",revision:"61f65ba90f21bd8c4fb90cba4a90ae64"},{url:"tutorial.html",revision:"363be47d27d8067fb5059d052cc5a998"},{url:"workout-library.html",revision:"9560a37537562ed1de70c4266bee3c34"},{url:"workout-overview.html",revision:"800f68ccf3239945743e261f219e6a84"},{url:"workout.html",revision:"b0a6a03ac8576cf6756c59b953919534"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.registerRoute((({request:e})=>"script"===e.destination),new e.StaleWhileRevalidate({cacheName:"javascript-cache",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.js.map
