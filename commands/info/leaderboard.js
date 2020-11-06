const levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "leaderboard",
    aliases: ["lb", "top"],
    category: "info",
    decription: "See the leaderboard of levels in this server.",
    run: async (client, message, args) => {
        const rawLeaderboard = await levels.fetchLeaderboard(message.guild.id, 10);
        if (rawLeaderboard.length < 1) return message.reply("Nobody is in the leaderboard yet, get some messages sent!");
        const leaderboard = levels.computeLeaderboard(client, rawLeaderboard);
        const mappedLeaderboard = leaderboard.map(entry => `${entry.position}. ${entry.username}#${entry.discriminator}: | Level: ${entry.level} | XP: ${entry.xp.toLocaleString()}`);
        let member = message.guild.member(message.author);
        let embedLeaderboard = new MessageEmbed()
            .setAuthor(`Top of the leaderboard for ${message.guild.name}.`, member.defaultAvatarURL || member.user.displayAvatarURL())
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(message.member.displayName || member.username + "#" + message.author.discriminator, member.defaultAvatarURL || member.user.displayAvatarURL());
        mappedLeaderboard.forEach(str => {
            embedLeaderboard.addField(str.split(": |")[0], str.split(": |")[1]);
        });
        message.channel.send(embedLeaderboard);
    }
}