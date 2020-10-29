const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest-reply",
    aliases: ["reply", "reply-suggest", "replysuggest", "suggestreply", "suggestionreply", "replysuggestion"],
    category: "moderation",
    description: "Reply to a suggestion in #suggestions",
    usage: "<Message ID>",
    run: async (client, message, args) => {
        if (message.author.id != 309776610255437824) return message.reply("You do not have permission to use this command!").then(m => m.delete({ timeout: 15000 }));

        if (!args[0]) return message.reply("You must supply the message ID").then(m => m.delete({ timeout: 15000 }));

        let reply = args.slice(1).join(" ");
        if (!reply) return message.reply("You must supply what you want to reply with!").then(m => m.delete({ timeout: 15000 }));

        let suggestionChannel = message.guild.channels.cache.find(channel => channel.name === "suggestions");

        var msg;
        suggestionChannel.messages.cache.array().some(function(message) {
            if (message.id == args[0]) {
                msg=message;
                return true;
            }
        });

        if (!msg) return message.reply("You must supply a valid message ID!").then(m => m.delete({ timeout: 15000 }));

        const recievedEmbed = msg.embeds[0];
        if (!recievedEmbed) return message.reply("You must supply a valid suggestion message!").then(m => m.delete({ timeout: 15000 }));

        const embed = new MessageEmbed(recievedEmbed).addField("Reply:", reply, false);

        msg.edit(embed);

        let replyEmbed = new MessageEmbed()
            .setColor("ORANGE")
            .setDescription(`${message.author}, your reply has successfully been added!`);

        message.channel.send(replyEmbed);
    }
}