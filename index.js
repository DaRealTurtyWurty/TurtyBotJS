const { Client, Collection, MessageEmbed } = require("discord.js");
require("dotenv").config({
	path: __dirname + "/.env"
});
const fs = require("fs");
const levels = require('discord-xp');
levels.setURL(`mongodb+srv://${process.env.PASSWORD}@turtybot.b8ggp.mongodb.net/test`);

const client = new Client({
	disableMentions: "everyone"
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

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

	message.channel.send("e");

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

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Levelling System
client.on("message", async message => {
	if (!message.guild) return;
	if (message.author.bot) return;

	const randXp = Math.floor(Math.random() * 9) + 1;
	const hasLeveledUp = await levels.appendXp(message.author.id, message.guild.id, randXp);
	if (hasLeveledUp) {
		const user = await levels.fetch(message.author.id, message.guild.id);
		message.channel.send(new MessageEmbed().setDescription(`Pog Champ, ${message.author} leveled up to level: **${user.level}**. Congrats 🎉!`).setColor("RANDOM"));
	}
});

client.login(process.env.TOKEN);