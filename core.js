const regex = /id=(\w+)&.*f=(\w+.+).torrent/g;



function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    console.log(item);
    var tracker = "";
    if (item.tracker) {
      tracker = item.tracker;
    }
    else if (item[0].tracker) {
      tracker = item[0].tracker;
    }
    //   document.body.style.border = "10px solid " + tracker;
    console.log(tracker);
    var str = document.querySelector(".wrapper a.btn-download").getAttribute("href");

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if(!!document.getElementsByClassName("btn-chumbok").length) {
            document.getElementsByClassName("btn-chumbok").remove();
        }

        var aTag = document.createElement('A');
        aTag.className = ("btn btn-lg btn-danger btn-chumbok");
        var mag_string = "magnet:?xt=urn:btih:" + m[1] + "&dn=" + encodeURI(m[2]);
        aTag.setAttribute('href',mag_string);
        aTag.innerHTML = "<i class=\"fa fa-magnet\"></i> Magnet";

        document.querySelector(".wrapper a.btn-download").parentNode.appendChild(aTag);
        
    }

}

var getting = browser.storage.local.get("tracker");
getting.then(onGot, onError);