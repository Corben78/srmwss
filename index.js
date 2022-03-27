const fs = require('fs');
const tmi = require('tmi.js');

// options set by user
let options = JSON.parse(fs.readFileSync('./config.json'));

twitch = new tmi.client(options.twitch);
twitch.connect();

twitch.on('chat', function(c, u, m, s) {
    // Don't listen to my own messages..
    if (s) return;

    onChatHandler(c, u, m);
});

function onChatHandler(channel, userstate, message) {
	//
}
