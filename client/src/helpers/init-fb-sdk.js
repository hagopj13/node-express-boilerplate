export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '368528274469848',
                cookie: true,
                xfbml: true,
                version: 'v10.0'
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            console.log("Inside dynamic load");
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            console.log("Inside dynamic load : Finish");
        }(document, 'script', 'facebook-jssdk'));
    });
}