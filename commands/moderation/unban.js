const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "unban",
    description: "Unban a member from the server.",
    aliases: ["ub", "unbanish"],
    category: "moderation",
    usage: "<user-id reason>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!").then(m => m.delete({ timeout: 15000 }));
        
        let user = await client.fetchUser(args[0]);
        if(!user) return message.channel.send("Please provide the user that you want to unban!").then(m => m.delete({ timeout: 15000 }));
        
        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send("Please provide a reason.").then(m => m.delete({ timeout: 15000 }));

        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I do not have permission to unban members!").then(m => m.delete({ timeout: 15000 }));
        if(message.deletable) message.delete();
        try {
            message.guild.unban(user, {reason: reason}).catch(err => {
                console.log(err.message);
            });
            message.channel.send(`${user.tag} has been unbanned from this server.`)
        } catch(err) {
            message.channel.send(err).then(m => m.delete({ timeout: 25000 }));
        }

        user.send(`You have been unbanned from the server: \`${message.guild.name}\` for the reason: \`${reason}\``).catch(err => {
            console.log(err.message);
        });

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**>Unbanned Member:** ${user.tag} (${user.id})
                **>Unbanned By:** ${message.author} (${message.author.id})
                **>Reason:** ${args.slice(1).join(" ")}`);
        let channel = message.guild.channels.cache.find(c => c.name === "admin-notices");
        if(!channel) message.guild.owner.send(`Unable to find channel(\`#admin-notices\`) in the guild: \`${message.guild.name}\``);
        else channel.send(embed);
    }
}