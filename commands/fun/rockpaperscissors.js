const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");
const choose = ['🗻', '📰', '✂'];

module.exports = {
    name: "rps",
    category: "fun",
    description: "Rock, Paper, Scissors game. React to the emojis to play.",
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game.")
            .setTimestamp();
        
        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, choose);
        const botChoice = choose[Math.floor(Math.random() * choose.length)];
        const result = await getResult(reacted, botChoice);
        
        await m.reactions.removeAll();
        embed.setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);
       
        m.edit(embed);

        function getResult(me, clientChosen) {
            if((me == "🗻" && clientChosen == "✂") || (me == "📰" && clientChosen == "🗻") || (me == "✂" && clientChosen == "📰")) return "You won!";
            else if(me == clientChosen) return "It's a tie!";
            else return "You lost!";
        }
    }
}