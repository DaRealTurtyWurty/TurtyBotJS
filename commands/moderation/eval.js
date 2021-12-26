const { MessageEmbed, Message } = require('discord.js');
const beautify = require('beautify');

module.exports = {
    name: "eval",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.author.id !== "309776610255437824") return message.channel.send("You need to be owner to use this command!");

        if (!args[0]) return message.channel.send("You need to provide code to eval!");

        try {
            if (args.join(' ').toLowerCase().includes("token")) {
                return;
            }

            const toEval = args.join(' ');
            const evaled = eval(toEval);
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(' '), { format: "js" })}\n\`\`\``)
                .addField("Evaluated:", evaled)
                .addField("Type of:", typeof (evaled));

            message.channel.send(embed);
        } catch (e) {
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setTitle("\:x: Error!")
                .setDescription(e)
                .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        }
    }
}