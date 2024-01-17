const regex = /id=(\w+)&.*f=(\w+.+).torrent/g;

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    let trs = '';
    if (typeof item.trackers === 'object') {
        item.trackers.forEach(element => {
            trs = trs + "&tr=" + encodeURI(element);
        });
    }
    console.log(trs);
    var str = document.querySelector(".wrapper a.btn-download").getAttribute("href");

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (document.querySelectorAll(".btn-chumbok").length > 0) {
            var buttons = document.querySelectorAll(".btn-chumbok");
            for (i = 0; i < buttons.length; ++i) {
                buttons[i].remove();
            }
        }
        var aTag = document.createElement('A');
        aTag.className = ("btn btn-lg btn-danger btn-chumbok");
        var mag_string = "magnet:?xt=urn:btih:" + m[1] + "&dn=" + encodeURI(m[2]) + trs;
        aTag.setAttribute('href', mag_string);
        aTag.innerHTML = "<i class=\"fa fa-magnet\"></i> Magnet";

        document.querySelector(".wrapper a.btn-download").parentNode.appendChild(aTag);
    }
}

var getting = browser.storage.local.get("trackers");

getting.then(function (data) {
    onGot(data);
}, function (error) {
    console.log('error', error);
    onGot({});
});
// getting.then(onGot, onError);