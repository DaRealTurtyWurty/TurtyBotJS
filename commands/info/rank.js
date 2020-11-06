const levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');
const { getMember } = require('../../functions.js');

module.exports = {
    name: "rank",
    aliases: ["level", "lvl", "whatsmylevel"],
    category: "info",
    decription: "See what level you are.",
    usage: "[@user | id | username]",
    run: async (client, message, args) => {
        let member = getMember(message, process.env.PREFIX + "rank" | process.env.PREFIX + "level" | process.env.PREFIX + "lvl");
        console.log(member);
        if (!member) message.channel.send(`We are unable to find this user, please try again, or use a different method. Use ${process.env.PREFIX}help rank for more info.`);
        const user = await levels.fetch(member.id, message.guild.id);
        message.channel.send(new MessageEmbed().setDescription(`${member} is currently level **${user.level}**!`).setColor("RANDOM"));
    }
}