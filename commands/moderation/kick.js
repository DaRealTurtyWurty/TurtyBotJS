const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick a user from the server. This can only be used by users that have the 'kick member' permission.",
    usage: "<mention reason | id reason>",
    run: async(client, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name == "admin-notices") || message.channel;

        if(message.deletable) message.delete();

        if(!args[0]) return message.reply("Please provide the user that you want to kick!").then(m => m.delete({ timeout: 15000 }));

        if(!args[1]) return message.reply("Please provide a reason for the kick!").then(m => m.delete({ timeout: 15000 }));

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`❌ You do not have permission to kick, please contact an administrator if something is wrong!`).then(m => m.delete({ timeout: 15000 }));
        
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`❌ I do not have permission to kick, please contact an administrator if something is wrong!`).then(m => m.delete({ timeout: 15000 }));

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!toKick) return message.reply("Unable to find that member, please try again!").then(m => m.delete({ timeout: 15000 }));

        if(message.author.id == toKick.id) return message.reply("You cannot kick yourself xD.").then(m => m.delete({ timeout: 15000 }));

        if(!toKick.kickable) return message.reply("I cannot kick that person because either they are a higher role than you or a higher role than me!").then(m => m.delete({ timeout: 15000 }));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**>Kicked Member:** ${toKick} (${toKick.id})
                **>Kicked By:** ${message.author} (${message.author.id})
                **>Reason:** ${args.slice(1).join(" ")}`);
        
        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("This verification becomes invalid after 30 seconds.")
            .setDescription(`Do you want to kick ${toKick}?`)
            .addField("Options:", `Yes: ✅ or No ❌?`, false);
        
        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(emoji === "✅") {
                msg.delete();
                
                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if(err) return message.channel.send(`Well...... Something went wrong? Here's the error: ${err}`)
                    });

                logChannel.send(embed);
            } else if(emoji === "❌") {
                msg.delete();

                message.reply("Kick canceled...")
                    .then(m => m.delete({ timeout: 15000 }));
            }
        })
    }
}