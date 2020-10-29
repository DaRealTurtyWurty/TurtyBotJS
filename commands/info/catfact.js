const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "catfact",
    category: "info",
    description: "Get a random cat fact.",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://some-random-api.ml/facts/cat`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Cat Fact 🐈`, message.guild.iconURL)
            .setTimestamp()
            .setTitle(body.fact);
        message.channel.send({embed: embed});
        msg.delete();
    }
}