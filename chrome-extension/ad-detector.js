// var selectors = ['*[id^="ad"]', "[id*='-ad']", "[id*='_ad']", "[id*=' ad']",
//                 '*[class^="ad"]', "[class*='-ad']", "[class*='_ad']", "[class*=' ad']"];
     


function replaceAds() {
    var selectors = ['*[src="r[0-9]+---sn-.*\.googlevideo\.com$"]', `*[src='r[0-9]+---sn-.*\.googlevideo\.com$']`,"*ytd-display-ad-renderer*"]

    var i = 0;

    for(i=0;i<selectors.length;i++){
        selectors[i] = selectors[i]+":first";
    }

    var elements = ["iframe", "ytd-display-ad-renderer", "ytd-action-companion-ad-renderer"]

    for(i=0;i<selectors.length;i++) {
        while($(selectors[i]).length){
            $(selectors[i]).replaceWith(`<iframe iframe="" src="https://api.streamlee.com/v1/streams/list/5cbf08d49d8e2700104b27a9" width="100%" height="100%"><p>Your browser does not support iframes.</p></iframe>`);
        }
    }

    var iframes = document.getElementsByTagName("iframe")
    var yt_renderers = document.getElementsByTagName("ytd-display-ad-renderer")
    var yt_renderers2 = document.getElementsByTagName("ytd-action-companion-ad-renderer")

    var adElements = Array.from(iframes)
                        .concat(Array.from(yt_renderers))
                        .concat(Array.from(yt_renderers2))

    console.log(adElements)

    if (!!adElements) {
        for(var i = 0; i < adElements.length; i++) {
            $(adElements[i]).replaceWith(`<iframe iframe="" src="https://api.streamlee.com/v1/streams/list/5cbf08d49d8e2700104b27a9" width="100%" height="100%"><p>Your browser does not support iframes.</p></iframe>`)

        }
    }

     
}

var pushState = history.pushState;
history.pushState = function () {
    console.log("Changing location")
    pushState.apply(history, arguments);
    fireEvents('pushState', arguments);  // Some event-handling function
    replaceAds()
};

window.onload = () => {
    replaceAds()
}