const { MessageEmbed, Message } = require("discord.js");
const PouchDB = require("pouchdb");
const suggestions = new PouchDB("suggestions");
var suggestionNo = 0;

module.exports = {
    name: "suggest",
    category: "utility",
    description: "Suggest something for the server or for a video",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("You need to actually suggest something, dummy!").then(m => m.delete({ timeout: 15000 }));

        let suggestion = args.slice(0).join(" ");

        var toAdd = {
            _id: message.id,
            suggestion: suggestion,
            reply: ""
        };

        suggestions.put(toAdd, function callback(err, result) {
            if (!err) {
                console.log("Suggestion Added!");
            }
        });

        let suggestionChannel = message.guild.channels.cache.find(channel => channel.id == 755925085591830660);

        if (!suggestionChannel) { message.channel.send("Error: No suggestion channel found").then(m => m.delete({ timeout: 15000 })); return; }

        suggestions.allDocs(function (err, response) {
            if (err) {
                return console.log(err);
            }

            suggestionNo = response.rows.length;
        });

        let r = await suggestions.allDocs().then(function (result) {
           return result.total_rows;
        }).catch(function (err) {
            return console.log(err);
        });

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("Suggestion #" + suggestionNo)
            .setDescription(suggestion)
            .setFooter(message.id);

        await suggestionChannel.send(embed).then(m => {
            m.react("⬆");
            m.react("⬇");
        });

        let completeEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${message.author}, your suggestion has successfully been added to ${suggestionChannel}!`);

        message.channel.send(completeEmbed);


        /*redrawUI = function (elements) {
            for (var i = 0; i < Object.keys(elements).length; i++) {
                message.channel.send("Suggestion ID: " + elements[i].id + ", Suggestion: " + elements[i].doc.suggestion);
            }
        }*/
    }
}