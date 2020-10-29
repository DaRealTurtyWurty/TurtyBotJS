const { MessageEmbed } = require("discord.js");
const { superagent } = require("superagent");
const { getRandomInt } = require("../../functions.js");

module.exports = {
    name: "image",
    aliases: ["randomimg", "randimg", "randomimage", "imgrandom", "imgrand"],
    description: "Gets a random.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`A random image 🖼`, message.guild.iconURL)
            .setTimestamp()
            .setImage(`https://picsum.photos/id/` + getRandomInt(999).toString() + `/400`);
        message.channel.send({embed: embed});
        msg.delete();
    }
}