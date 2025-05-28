# Musideck

See what's playing currently, with a bit of eye candy!

Musideck running on desktop:
![Musideck desktop screenshot](demo.png)

# How to use

### Prerequisites:
* A Linux computer with an MPRIS compatible media player (Ex: VLC, Spotify, Exaile, Rhythmbox)
* python3
* flask
* dbus-python

For Debian/Ubuntu:

```bash
sudo apt update && sudo apt install python3 python3-flask python3-dbus -y
```

### Step 1:
Clone the repo and `cd` in with

```bash
git clone https://github.com/0hStormy/Musideck.git && cd Musideck
```

### Step 2:
Start the flask server with
```bash
flask --app main run
```

### Step 3:
Open a **modern** web browser and type the following in the URL bar and press enter

```
http://127.0.0.1:5000/
```