const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports = {
    name: "warn",
    description: "Warn a user(3 warns = kick, 5 warns = ban).",
    usage: "<mention reason | id reason>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the 'manage members' permission!").then(m => m.delete({ timeout: 15000 }));
        
        let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(user.bot) return;
        if(message.deletable) message.delete();
        if(!user) return message.reply("You must specify the user to warn!").then(m => m.delete({ timeout: 15000 }));
        if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot warn a user which has a higher status than you or equal status to you!").then(m => m.delete({ timeout: 15000 }));
        
        let reason = args.slice(1).join(" ");

        if(!warns[user.id]) warns[user.id] = {
            warns: 0
        };

        warns[user.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if(err) console.log(err);
        });

        let embed = new MessageEmbed()
            .setDescription("Warns")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("#fc6400")
            .addField("Warned User:", `<@${user.id}>`)
            .addField("Warned In:", message.channel)
            .addField("Number of Warnings:", warns[user.id].warns)
            .addField("Reason:", reason);

        let modChannel = message.guild.channels.cache.find(c => c.name === "admin-notices");
        if(!modChannel) message.guild.defaultChannel.send(embed); else modChannel.send(embed);

        if(warns[user.id].warns == 2) {
            let muteRole = message.guild.roles.find(r => r.name === "Muted");
            if(!muteRole) return message.channel.send(`I am unable to find the role: ${muteRole}!`);
            else {
                let muteTime = "600s";
                await(user.addRole(muteRole.id).then(() => {
                    if(message.deletable) message.delete();
                    user.send(`Hello ${user.username}, you have been muted in ${message.guild.name} for: ${reason}!`);
                    message.channel.send(`${user.username} was successfuly muted for: ${reason}`).then(m => m.delete({ timeout: 15000 }));
                })).catch(err => { if(err) return message.channel.send(`Well...... Something went wrong? Here's the error: ${err}`)});
                
                setTimeout(function() {
                    user.removeRole(muteRole.id);
                }, ms(muteTime));
            }
        }

        if(warns[user.id].warns == 3) {
            user.kick(reason).catch(err => {
                if(err) return message.channel.send(`Well...... Something went wrong? Here's the error: ${err}`);
            });
        }

        if(warns[user.id].warns == 5) {
            user.ban(reason).catch(err => {
                if(err) return message.channel.send(`Well...... Something went wrong? Here's the error: ${err}`)
            });
        }
    }
}