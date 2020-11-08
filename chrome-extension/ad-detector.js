// var selectors = ['*[id^="ad"]', "[id*='-ad']", "[id*='_ad']", "[id*=' ad']",
//                 '*[class^="ad"]', "[class*='-ad']", "[class*='_ad']", "[class*=' ad']"];
     

var currentLocation
const adLink = "http://localhost:3000/api/v1/memes/random/img"

function replaceAds() {
    var selectors = ['*[src="r[0-9]+---sn-.*\.googlevideo\.com$"]', `*[src='r[0-9]+---sn-.*\.googlevideo\.com$']`,"*ytd-display-ad-renderer*"]

    var i = 0;

    for(i=0;i<selectors.length;i++){
        selectors[i] = selectors[i]+":first";
    }

    var elements = ["iframe", "ytd-display-ad-renderer", "ytd-action-companion-ad-renderer"]

    for(i=0;i<selectors.length;i++) {
        while($(selectors[i]).length){
            $(selectors[i]).replaceWith(`<iframe src="https://api.streamlee.com/v1/streams/list/5cbf08d49d8e2700104b27a9" width="100%" height="100%"><p>Your browser does not support iframes.</p></iframe>`);
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
            if ((!!(adElements[i].outerHTML) && !(adElements[i].outerHTML.includes("random"))) || !(adElements[i].outerHTML)) {
                $(adElements[i]).replaceWith(`<iframe iframe="" src="${adLink}" width="100%" height="100%"><p>Your browser does not support iframes.</p></iframe>`)
            }
        }
    }
}


$(document).ready(() => {
    currentLocation = location.href
    setInterval(replaceAds, 1000)
    replaceAds()
})