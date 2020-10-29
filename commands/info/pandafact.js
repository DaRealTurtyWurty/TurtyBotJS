const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "pandafact",
    category: "info",
    description: "Get a random panda fact.",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://some-random-api.ml/facts/panda`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Panda Fact 🐼`, message.guild.iconURL)
            .setTimestamp()
            .setTitle(body.fact);
        message.channel.send({embed: embed});
        msg.delete();
    }
}