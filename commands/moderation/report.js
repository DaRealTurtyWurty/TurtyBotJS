const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async(client, message, args) => {
        if(message.deletable) message.delete();

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if(!member) return message.reply("Couldn't find that user!").then(m => m.delete({ timeout: 15000 }));

        if(member.id == message.author.id) return message.reply("You cant report yourself, silly xD!").then(m => m.delete({ timeout: 15000 }));

        if(member.hasPermission("BAN_MEMBERS") || member.user.bot) return message.reply("Can't report that member!").then(m => m.delete({ timeout: 15000 }));

        if(!args[1]) return message.channel.send("Please provide a reason for the report!").then(m => m.delete({ timeout: 15000 }));

        const channel = message.guild.channels.cache.find(channel => channel.name == "admin-notices");
        if(!channel) return message.channel.send("I could not find a \`#admin-notices`\ channel!").then(m => m.delete({ timeout: 15000 }));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported Member", member.user.displayAvatarURL)
            .setDescription(stripIndents`**>Member:** ${member} (${member.id})
            **>Reported By:** ${message.member} (${message.member.id})
            **>Reported in:** ${message.channel}
            **>Reason:** ${args.slice(1).join(" ")}`);
        channel.send(embed);
    }
}