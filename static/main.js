function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpPost(theUrl, requestBody=null) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false);
    xmlHttp.send(requestBody);
    return xmlHttp.responseText;
}

async function reconnect() {
    try {
        const response = await fetch(window.location.href);

        if (response.ok) {
            location.reload()
        }
    } catch (error) {
        console.error("Failed to connect to server: ", error.message);
        document.body.innerHTML = `<div class="root"><h1>Failed to reconnect!</h1><p>${error.message}</p><button>Reconnect</button></div>`;
    }
}

function timeFormat(duration) {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

async function playbackChange() {
    const response = await fetch(`${window.location.href}/playback`);
    const songJSON = await response.json();
    if (songJSON.status == "Playing") {
        document.getElementById('media-state').src = "/static/img/pause.svg";
    } else {
        document.getElementById('media-state').src = "/static/img/play.svg"
    }
}

var lastCoverVersion = null;

async function main() {
    try {
        const response = await fetch(`${window.location.href}/get`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const songJSON = await response.json();
        const cacheBust = `?v=${songJSON.title}`;

        if (songJSON.art_url !== lastCoverVersion) {
            lastCoverVersion = songJSON.art_url;

            document.getElementById('title').innerHTML = songJSON.title;
            document.getElementById('album').innerHTML = songJSON.album;
            document.getElementById('artist').innerHTML = songJSON.artist;
            document.getElementById('cover').src = `/cover${cacheBust}`;
            document.querySelector('body').style.backgroundImage = `url("/cover${cacheBust}")`;
        }

        if (songJSON.status == "Playing") {
            document.getElementById('media-state').src = "/static/img/pause.svg";
        } else {
            document.getElementById('media-state').src = "/static/img/play.svg";
        }

        document.getElementById('bar').style.width = `${(songJSON.position / songJSON.duration) * 100}%`;
        document.getElementById('progress-text').innerHTML = `${timeFormat(songJSON.position)}/${timeFormat(songJSON.duration)}`
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            console.error("Failed to connect to server: ", error.message);
            document.body.innerHTML = `<div class="root"><h1>Musideck lost server connection!</h1><p>${error.message}</p><button onclick="reconnect()">Reconnect</button></div>`;
        }
    } finally {
        setTimeout(main, 1000);
    }
}

main();
