#!/bin/sh

if [ $(id -u) -ne 0 ]; then
	echo "This script must be run as root"
	exit 1
fi

# Copy server
cp main.py /usr/bin/musideck

# Copy web client data
rm -r /usr/share/musideck
mkdir -p /usr/share/musideck
cp -r static /usr/share/musideck/static

# Copy systemd service (sorry OpenRC and/or runit snobs)
mkdir -p /etc/systemd/user
cp musideck.service /etc/systemd/user/musideck.service

mkdir -p /usr/lib/dinit.d/user
cp musideck.dinit /usr/lib/dinit.d/user/musideck

cat - >&2 <<EOF
If using systemd, run as a user:

	systemctl --user enable --now musideck

Otherwise, if using dinit:

	dinitctl --user enable --now musideck

EOF
