const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Gets an epic meme!",
    run: async(client, message, args) => {
        const subreddits = ["dankmemes", "memes", "me_irl"];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)];
        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
        
        message.channel.send(embed);
    }
}