const fs = require('fs');
const tmi = require('tmi.js');
const WebSocket = require('ws');

// options set by user
let options = JSON.parse(fs.readFileSync('./config.json'));

twitch = new tmi.client(options.twitch);
twitch.connect();

twitch.on('chat', function(c, u, m, s) {
	// check for allowed commands

    onChatHandler(c, u, m);
});


const wss = new WebSocket.Server({
    port: 9090,
    path: '/SRM'
});

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
    	twitch.say(options.twitch.channels[0], String(message));
    });

});

function onChatHandler(channel, userstate, message) {

}
