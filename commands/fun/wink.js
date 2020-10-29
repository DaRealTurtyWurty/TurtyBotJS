const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "wink",
    description: "Sends a wink gif 😉.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://some-random-api.ml/animu/wink`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`😉`, message.guild.iconURL)
            .setTimestamp()
            .setImage(body.link);
        message.channel.send({embed: embed});
        msg.delete();
    }
}