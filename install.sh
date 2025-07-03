# Copy server
cp main.py /usr/bin/musideck
chmod +x /usr/bin/musideck

# Copy web client data
sudo rm -r /usr/share/musideck
sudo mkdir /usr/share/musideck
sudo cp -r static /usr/share/musideck/static

# Copy systemd service (sorry OpenRC and/or runit snobs)
sudo cp musideck.service /etc/systemd/user/musideck.service
