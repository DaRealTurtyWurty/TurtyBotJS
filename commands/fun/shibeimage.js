const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "shibe",
    description: "Sends a random image of shibe.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Here, take shibe 🐕!`, message.guild.iconURL)
            .setTimestamp()
            .setImage(body[0]);
        message.channel.send({embed: embed});
        msg.delete();
    }
}