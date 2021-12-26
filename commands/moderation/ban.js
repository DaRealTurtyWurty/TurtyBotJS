const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Ban a user from the server. This can only be used by users that have the 'ban member' permission.",
    usage: "<mention reason | id reason>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name == "admin-notices") || message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) return message.reply("Please provide the user that you want to ban!").then(m => m.delete({ timeout: 15000 }));

        if (!args[1]) return message.reply("Please provide a reason for the ban!").then(m => m.delete({ timeout: 15000 }));

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`❌ You do not have permission to ban, please contact an administrator if something is wrong!`).then(m => m.delete({ timeout: 15000 }));

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`❌ I do not have permission to ban, please contact an administrator if something is wrong!`).then(m => m.delete({ timeout: 15000 }));

        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!toBan) return message.reply("Unable to find that member, please try again!").then(m => m.delete({ timeout: 15000 }));

        if (message.author.id == toBan.id) return message.reply("You cannot ban yourself xD.").then(m => m.delete({ timeout: 15000 }));

        if (!toBan.bannable) return message.reply("I cannot ban that person because either they are a higher role than you or a higher role than me!").then(m => m.delete({ timeout: 15000 }));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**>Banned Member:** ${toBan} (${toBan.id})
                **>Banned By:** ${message.author} (${message.author.id})
                **>Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("This verification becomes invalid after 30 seconds.")
            .setDescription(`Do you want to ban ${toBan}?`)
            .addField("Options:", `Yes: ✅ or No ❌?`, false);

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                toBan.ban({ reason: args.slice(1).join(" ") })
                    .catch(err => {
                        if (err) return message.channel.send(`Well...... Something went wrong? Here's the error: ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply("Ban canceled...")
                    .then(m => m.delete({ timeout: 15000 }));
            }
        })
    }
}