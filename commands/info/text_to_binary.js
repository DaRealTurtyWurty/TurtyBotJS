const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "ttb",
    aliases: ["texttobinary", "text_to_binary"],
    category: "info",
    description: "Convert text into binary.",
    usage: `${process.env.PREFIX}ttb <text>`,
    run: async(client, message, args) => {
        if(args[0]) {
            let msg = await message.channel.send("Generating...");
            
            let {body} = await superagent.get(`https://some-random-api.ml/binary?text=${args.slice(0).join(" ")}`);
            if(!{body}) return message.channel.send("I broke. Please try again.");
        
            message.channel.send("'" + args.slice(0).join(" ") + "' in binary is: " + body.binary);
            msg.delete();
        }
    }
}