function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var lastCoverVersion = null;

async function main() {
    const response = await fetch("http://127.0.0.1:5000/get");
    const songJSON = await response.json();
    const cacheBust = `?v=${songJSON.title}`;

    if (songJSON.art_url !== lastCoverVersion) {
        lastCoverVersion = songJSON.art_url;

        document.getElementById('title').innerHTML = songJSON.title
        document.getElementById('artist').innerHTML = songJSON.artist
        document.getElementById('cover').src = `/static/cover.png${cacheBust}`;
        document.querySelector('body').style.backgroundImage = `url("/static/cover.png${cacheBust}")`;
    }
    
    if (songJSON.status == "Playing") {
        document.getElementById('media-state').src = "/static/img/pause.svg";
    } else {
        document.getElementById('media-state').src = "/static/img/play.svg"
    }
    document.getElementById('bar').style.width = `${(songJSON.position / songJSON.duration) * 100}%`;

    setTimeout(main, 1000);
}

main();
