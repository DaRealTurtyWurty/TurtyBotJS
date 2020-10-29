const { Client, RichEmbed, Collection, Guild } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const http = require('http');
const PouchDB = require("pouchdb");
PouchDB.plugin(require('pouchdb-upsert'));
const database = new PouchDB('levels');

const client = new Client({
	disableMentions: "everyone"
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

config({
	path: __dirname + "/.env"
});

["command"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
	client.user.setPresence({
		game: {
			name: "!help",
			type: "WATCHING"
		},
		status: "online"
	});
});

client.on("message", async message => {
	const prefix = process.env.PREFIX;

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);

	const cmd = args.shift().toLowerCase();

	if (cmd.length == 0) return;

	let command = client.commands.get(cmd);

	if (command != undefined) {
		if (command.name == "topic" || command.name == "wyr") {
			command.run(client, message, args);
			return;
		}
	}

	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command && (message.channel.name == "bot-stuff" || message.channel.name === "bot-dev")) command.run(client, message, args);
});

client.on('guildMemberAdd', member => {
	client.channels.cache.get('739509016115281963').send(`Welcome to the server ${member}! Make sure to read the rules!`);
	member.roles.add(member.guild.roles.cache.find(role => role.name === 'Member'));
});

client.on("message", async message => {
	if (getRndInteger(0, 2) == 0 && message.author != client.user) {
		var level = await database.get(message.author.id).then(r => {
			console.log(r);
			return r.currentlevel;
		});

		var response = await database.upsert(message.author.id, myDeltaFunction).catch(function (err) {
			return database.putIfNotExists({
				_id: message.author.id,
				xp: getRndInteger(5, 25),
				currentlevel: 0
			});
		});
		console.log(response);

		var newlevel = await database.get(message.author.id).then(r => {
			return r.currentlevel;
		});

		console.log(level + " " + newlevel);

		if (newlevel > level) {
			message.channel.send(`Congratulations <@${message.author}. You are now level ${newlevel}! POG!`)
		}
	}
});

function myDeltaFunction(doc) {
	doc.xp += getRndInteger(5, 25);
	console.log(doc.xp);
	doc.currentlevel = Math.floor(0.0006 * response.xp) >= 5 ? determineXPLevel(response.xp) : Math.floor(0.0006 * response.xp);
	return doc;
}

function determineXPLevel(xp) {
	if (xp < 250) return 0;
	if (xp < 650 && xp >= 250) return 1;
	if (xp < 1100 && xp >= 650) return 2;
	if (xp < 1700 && xp >= 1100) return 3;
	if (xp < 2250 && xp >= 1700) return 4;
	if (xp < 3000 && xp >= 2250) return 5;
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("xf8bot good wide putin best");

client.login(process.env.TOKEN);
