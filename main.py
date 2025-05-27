import dbus
import json
import shutil
from flask import Flask

def get_active_mpris_players():
    session_bus = dbus.SessionBus()
    players = []

    for service in session_bus.list_names():
        if service.startswith("org.mpris.MediaPlayer2."):
            players.append(service)

    return players

def get_song_info(player_service):
    try:
        session_bus = dbus.SessionBus()
        player = session_bus.get_object(player_service, "/org/mpris/MediaPlayer2")
        props = dbus.Interface(player, "org.freedesktop.DBus.Properties")

        metadata = props.Get("org.mpris.MediaPlayer2.Player", "Metadata")
        status = props.Get("org.mpris.MediaPlayer2.Player", "PlaybackStatus")
        position = props.Get("org.mpris.MediaPlayer2.Player", "Position")

        title = metadata.get("xesam:title", "Unknown Title")
        artists = metadata.get("xesam:artist", ["Unknown Artist"])
        artist = artists[0] if artists else "Unknown Artist"
        art_url = metadata.get("mpris:artUrl", "No cover art")
        duration = metadata.get("mpris:length", 0)  # microseconds

        position_sec = position / 1_000_000
        duration_sec = duration / 1_000_000 if duration else None

        return {
            "player": player_service.replace("org.mpris.MediaPlayer2.", ""),
            "status": status,
            "title": title,
            "artist": artist,
            "art_url": art_url,
            "position": position_sec,
            "duration": duration_sec
        }

    except dbus.exceptions.DBusException:
        return None

def replaceInfo():
    players = get_active_mpris_players()
    if not players:
        print("No MPRIS players found.")
        return

    for player in players:
        info = get_song_info(player)
        info["art_url"] = info["art_url"].removeprefix("file://")  
        shutil.copyfile(info["art_url"], "static/cover.png")
        return json.dumps(info)

def readFile(file):
    with open(file, "r") as f:
        return f.read()

app = Flask(__name__)

@app.route("/", methods=('GET', 'POST'))
def main():
    return readFile("static/index.html")

@app.route("/get", methods=('GET', 'POST'))
def songInfo():
    return replaceInfo()