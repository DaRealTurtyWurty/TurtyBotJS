const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "namegender",
    category: "fun",
    description: "Predict the gender from a first name.",
    usage: "<first name>",
    run: async(client, message, args) => {
        if(args[0]) {
            let msg = await message.channel.send("Generating...");

            let {body} = await superagent.get(`https://api.genderize.io?name=${args[0]}`);
            if(!{body}) return message.channel.send("I broke. Please try again.");
            
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setTitle(`I have estimated that the name '${body.name}' correlates to an gender of ${body.gender} with ${body.probability.toString().replace("0.", "")}% probability.`.replace("null", "turty").replace("0%", Math.round(Math.random() * 100) + "%"));
            message.channel.send({embed: embed});
            msg.delete();
        } else {
            message.channel.send("Please specify a name.");
        }
    }
}