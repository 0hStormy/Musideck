# Creating Custom Musideck Client

This guide will teach you the basics of making a Musideck client.

## API

### /
Returns a web interface, may be useful for the end user but not very useful for developing a client.

### /get
Returns all needed text info, here's an example of what the Musideck server would send back to you:
```json
{
    "player": "VLC",
    "status": "Playing",
    "title": "Like Him",
    "album": "CHROMAKOPIA",
    "artist": "Tyler, The Creator",
    "art_url": "/home/stormy/Music/Tyler, The Creator/CHROMAKOPIA/cover.png",
    "position": "132",
    "duration": "278"
}
```
This endpoint doesn't need any special header or body info to use.

### /playback
Sending a `GET` request to this endpoint will toggle the media's playback state of playing/paused. This endpoint doesn't need any special header or body info to use.

This endpoint will return the same info as `/get`.

### /next
Sending a `GET` request to this endpoint will request MRPIS to go to the next media (usually a song). Will do nothing if there's no media after the current media playing. This endpoint doesn't need any special header or body info to use.

This endpoint will return the same info as `/get`.

### /previous
Sending a `GET` request to this endpoint will request MRPIS to go to the previous media (usually a song). Will do nothing if there's no media after the current media playing. This endpoint doesn't need any special header or body info to use.

This endpoint will return the same info as `/get`.

### Cover Art
Simply fetch from `https://SERVERHERE/static/cover.png` and the server will return the current cover art.