const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    aliases: ["user", "memberinfo"],
    category: "info",
    description: "Get information about a user",
    usage: "[id or mention or name]",
    run: async(client, message, args) => {
        let member = message.guild.member(message.author);
        if(args[0]) member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(client.users.cache.find(user => user.username === args.slice(0).join(" ")));

        if(message.deletable) message.delete();
        if(!member) return message.reply("Unable to find that member, please try again!").then(m => m.delete({ timeout: 15000 }));

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(member.defaultAvatarURL || member.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setTitle(`User Info for user: ${member.displayName || member.username}`)
            .addField("Is bannable:", member.bannable.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Is kickable:", member.kickable.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Is removed:", member.deleted.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Base 10 Color", member.displayColor, true)
            .addField("Hex Color:", member.displayHexColor, true)
            .addField("Can I manage:", member.manageable.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Display Name:", member.displayName, true)
            .addField("Nickname:", member.nickname || member.user.username, true)
            .addField("User ID:", member.id, true)
            .addField("Discriminator:", member.user.discriminator, true)
            .addField("Locale:", member.user.locale || "none", true)
            .addField("Is System User:", (member.user.system || false).toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Is bot:", member.user.bot.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("User Tag:", member.user.tag, true)
            .addField("Is partial:", member.user.partial.toString().replace("false", "No").replace("true", "Yes"), true)
            .addField("Joined At:", member.joinedAt, true);
        
        message.channel.send(embed);
    }
}