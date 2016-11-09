const regex = /id=(\w+)&.*f=(\w+.+).torrent/g;
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