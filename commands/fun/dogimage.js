const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "dog",
    aliases: ["dogimage", "doge", "woof", "doggo"],
    description: "Gets a random image of a dog.",
    category: "fun",
    run: async(client, message, args) => {
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent.get(`https://dog.ceo/api/breeds/image/random`);
        if(!{body}) return message.channel.send("I broke. Please try again.");
        
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Woof 🐶`, message.guild.iconURL)
            .setTimestamp()
            .setImage(body.message);
        message.channel.send({embed: embed});
        msg.delete();
    }
}