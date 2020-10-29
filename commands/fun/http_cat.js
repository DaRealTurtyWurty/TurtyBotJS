const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "httpcat",
    description: "Gets a cat image that corresponds with the http response code.",
    category: "fun",
    uage: "<Status code>",
    run: async(client, message, args) => {

        if(args[0]) {
            let msg = await message.channel.send("Generating...");

            let {body} = await superagent.get(`https://http.cat/${args[0]}`).catch(err => {
                message.channel.send(`Invalid Status Code: ${args[0]}`).then(m => msg.delete());
                return;
            });

            if(!{body}) return message.channel.send("I broke. Please try again.");
            
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Error code: ${args[0]} 🐱`, message.guild.iconURL)
                .setTimestamp()
                .setImage(`https://http.cat/${args[0]}`);
            message.channel.send({embed: embed});
            msg.delete();
        }
    }
}