const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "bird",
    aliases: ["bird", "birdimage"],
    description: "Gets a random image of a bird.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://some-random-api.ml/img/birb`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Birb 🐦🦜`, message.guild.iconURL)
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({embed: embed});
        msg.delete();
    }
}