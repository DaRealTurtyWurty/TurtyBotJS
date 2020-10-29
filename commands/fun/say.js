const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "say",
    aliases: ["broadcast", "speak"],
    category: "fun",
    description: "Says the user's input via the bot. Note: Abusing this command will result in an instant kick. This involves extensive trolling, trying to bypass things and similar.",
    usage: "<input>",
    run: async(client, message, args) => {
        if(message.deletable) message.delete();

		if(args.length < 1) return message.reply("Nothing to say?").then(m => m.delete({ timeout: 15000 }));

		const roleColor = message.guild.me.displayHexColor == "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

		if(args[0].toLowerCase() == "embed") {
			const embed = new MessageEmbed().setColor(roleColor).setDescription(args.slice(1).join(" ")).setTimestamp().setFooter(client.user.username, client.user.displayAvatarURL).setTitle(client.user.username + " said:");
			message.channel.send(embed);
		} else {
			message.channel.send(args.join(" "));
		}
    }
}