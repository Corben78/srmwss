const fs = require('fs');
const tmi = require('tmi.js');
const WebSocket = require('ws');

// options set by user
let options = JSON.parse(fs.readFileSync('./config.json'));

let srmcmds = ['!bsr', '!about', '!addnew', '!addsongs', '!addtolist', '!addtoqueue', '!alias', '!allowmappers', '!at', '!att', '!backup', '!blist', '!block', '!blockmappers', '!chatmessage', '!clearalreadyplayed', '!clearevents', '!clearlist', '!clearqueue', '!close', '!commandlist', '!deck', '!decklist', '!detail', '!downloadsongs', '!every', '!formatlist', '!help', '!history', '!in', '!joinrooms', '!last', '!link', '!list', '!lists', '!listundo', '!loaddecks', '!lookup', '!makesearchdeck', '!mapperdeck', '!modadd', '!mtt', '!open', '!openlist', '!played', '!queue', '!queuelottery', '!queuestatus', '!readarchive', '!readdeck', '!refreshsongs', '!remap', '!remove', '!removefromlist', '!request', '!restore', '!runscript', '!savecommands', '!savesongdatabase', '!songmsg', '!unblock', '!unload', '!unloaddeck', '!unmap', '!unqueuelist', '!unqueuemsg', '!updatemappers', '!whatdeck', '!who', '!write', '!writedeck', '!wrongsong'];

twitch = new tmi.client(options.twitch);
twitch.connect();

twitch.on('chat', function(c, u, m, s) {
    // check for allowed commands
    message = m.toLowerCase();
    if (! srmcmds.some(substr => message.startsWith(substr))) return;
    onChatHandler(c, u, message);
});

const wss = new WebSocket.Server({
    port: 9090,
    path: '/SRM'
});

let webs = null;

wss.on('connection', function connection(ws) {

	console.log("client connected");

	webs = ws;

    WSData = {
        "Id": options.twitch.identity.id,
        "UserName": options.twitch.identity.username,
        "DisplayName": options.twitch.identity.displayname,
        "Color": "#FFFFFF",
        "IsModerator": false,
        "IsBroadcaster": true,
        "IsSubscriber": true,
        "IsTurbo": false,
        "IsVip": false,
        "Badges": [],
        "Message": "userInfo",
        "Command": "s"
    }

    ws.send(JSON.stringify(WSData));

    ws.on('message', function incoming(message) {
        twitch.say(options.twitch.channels[0], String(message));
    });

});

function onChatHandler(channel, userstate, message) {
	if (webs == null) {
		console.log("no webserver connection");
		return;
	}

    WSData = {
        "Id": userstate['user-id'],
        "UserName": userstate['username'],
        "DisplayName": userstate['display-name'],
        "Color": "#FFFFFF",
        "IsModerator": userstate['mod'],
        "IsBroadcaster": false,
        "IsSubscriber": userstate['subscriber'],
        "IsTurbo": false,
        "IsVip": false,
        "Badges": [],
        "Message": message,
        "Command": "c"
    }

    webs.send(JSON.stringify(WSData));
	/*
	wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(WSData));
      }
    });
    */
}
