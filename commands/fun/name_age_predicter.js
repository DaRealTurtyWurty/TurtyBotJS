const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "nameage",
    category: "fun",
    description: "Predict the age from a first name.",
    usage: "<first name>",
    run: async(client, message, args) => {
        if(args[0]) {
            let msg = await message.channel.send("Generating...");

            let {body} = await superagent.get(`https://api.agify.io?name=${args[0]}`);
            if(!{body}) return message.channel.send("I broke. Please try again.");
            
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setTitle(`I have estimated that the name '${body.name}' correlates to an age of ${body.age}`.replace("null", Math.floor(Math.random() * 101)));
            message.channel.send({embed: embed});
            msg.delete();
        } else {
            message.channel.send("Please specify a name.");
        }
    }
}