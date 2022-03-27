# srmwss
Song Request Manager Websocket Server

## About

This is the counterpart to the updated [Song Request Manager](https://github.com/angturil/SongRequestManager) mod for Beat Saber (credits to [Krayn](https://github.com/Krayn)).

## Usage

- Clone repository
- 'npm install'
- Get clientId form https://dev.twitch.tv/console/apps/create
- Get oauth code from https://twitchapps.com/tmi/
- Get twitch user id from https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/
- copy config.example.json to config.json
- Enter clientId, oauth code, user id, display name, username in config.json
- node index.js
