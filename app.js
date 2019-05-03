const tfapi = require('tmi.js');
const fku = require('./config.json');
const fs = require('fs');

var joinchnl = '';

const thefuckingoptions = {
	options: {
		debug: false
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	identity: {
		password: fku.token
	},
	channels: [ joinchnl ]
};

const client = new tfapi.client(thefuckingoptions);
client.connect();

/* LOGGER */
var stream;
stream = fs.createWriteStream("./log.txt");

client.on('chat', (channel,user,message,self) => {
	let sender = user['display-name'];

	var time = () => {
		var d = new Date();

		var datetext = d.toTimeString();

		datetext = datetext.split(' ')[0];

		return datetext;
	}

	if (sender.toLowerCase().includes("bot")) {
		stream.write(`${time()} - [BOT] ${sender} | ${message}\n`);
	} else if (sender.toLowerCase() == "theespark" || sender.toLowerCase() == joinchnl) {
		stream.write(`${time()} - [KING] ${sender} | ${message}\n`);
	} else if (user.mod) {
		stream.write(`${time()} - [MOD] ${sender} | ${message}\n`);
	} else {
		stream.write(`${time()} - ${sender} | ${message}\n`);
	}

})

client.on('action', (channel,user,message,self) => {
	let sender = user['display-name'];

	var time = () => {
		var d = new Date();

		var datetext = d.toTimeString();

		datetext = datetext.split(' ')[0];

		return datetext;
	}
	
	if (sender.toLowerCase().includes("bot")) {
		stream.write(`${time()} - * [BOT] ${sender} | ${message}\n`);
	} else if (sender.toLowerCase() == "theespark" || sender.toLowerCase() == joinchnl) {
		stream.write(`${time()} - * [KING] ${sender} | ${message}\n`);
	} else if (user.mod) {
		stream.write(`${time()} - * [MOD] ${sender} | ${message}\n`);
	} else {
		stream.write(`${time()} - * ${sender} | ${message}\n`);
	}
})

client.on('timeout', (channel, username, reason, duration, user) =>{
	stream.write(`${time()} - [TIMEOUT] ${user["target-user-id"]} timeouted by ${username} for ${duration} seconds.`);
})
/* LOGGER */
