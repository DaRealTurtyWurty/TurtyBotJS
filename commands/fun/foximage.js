const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "fox",
    aliases: ["foximage", "foxy"],
    description: "Gets a random image of a fox.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://some-random-api.ml/img/fox`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Foxes 🦊`, message.guild.iconURL)
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({embed: embed});
        msg.delete();
    }
}