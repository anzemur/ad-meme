var selectorsClasses = ['*[id^="ad"]', "[id*='-ad']", "[id*='_ad']", "[id*=' ad']",
                '*[class^="ad"]', "[class*='-ad']", "[class*='_ad']", "[class*=' ad']"];

var tagNames = ['*[src="r[0-9]+---sn-.*\.googlevideo\.com$"]', `*[src='r[0-9]+---sn-.*\.googlevideo\.com$']`,"*ytd-display-ad-renderer*", '*[id^="ad[a-zA-Z]+"]', "[id*='-ad[a-zA-Z]+']", "[id*='_ad[a-zA-Z]+']", "[id*=' ad[a-zA-Z]+']",
'*[class^="ad[a-zA-Z]+"]', "[class*='-ad[a-zA-Z]+']", "[class*='_ad[a-zA-Z]+']", "[class*=' ad[a-zA-Z]+']"]
     

var currentLocation
const adLink = "http://localhost:3000/api/v1/memes/random/img"

function replaceAds() {

    var i = 0;

    for(i=0;i<tagNames.length;i++){
        tagNames[i] = tagNames[i]+":first";
    }


    for(i=0;i<tagNames.length;i++) {
        while($(tagNames[i]).length){
            $(tagNames  [i]).replaceWith(`<iframe iframe="" src="${adLink}" width="100%" height="100%" style="border: 0px;background-color:white;"><p>Your browser does not support iframes.</p></iframe>`);
        }
    }

    var iframes = document.getElementsByTagName("iframe")
    var yt_renderers = document.getElementsByTagName("ytd-display-ad-renderer")
    var yt_renderers2 = document.getElementsByTagName("ytd-action-companion-ad-renderer")

    var adElements = Array.from(iframes)
                        .concat(Array.from(yt_renderers))
                        .concat(Array.from(yt_renderers2))


    if (!!adElements) {
        for(var i = 0; i < adElements.length; i++) {
            if ((!!(adElements[i].outerHTML) && !(adElements[i].outerHTML.includes("random"))) || !(adElements[i].outerHTML)) {
                $(adElements[i]).replaceWith(`<iframe iframe="" src="${adLink}" width="100%" height="100%" style="border: 0px;background-color:white;"><p>Your browser does not support iframes.</p></iframe>`)
            }
        }
    }
}


$(document).ready(() => {
    currentLocation = location.href
    setInterval(replaceAds, 1000)
    replaceAds()
})