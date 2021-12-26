module.exports = {
    getMember: function (message, command) {
        let target = message.mentions.members.first() || client.users.cache.find(u => u.tag === message.split(command)[1]) || message.guild.members.cache.get(message.split(command)[1]);
        return target;
    },

    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-GB').format(date);
    },

    promptMessage: async function (message, author, time, validReactions) {
        time *= 1000;

        for (const reaction of validReactions) await message.react(reaction);

        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id == author.id;

        return message
            .awaitReactions(filter, { max: 1, time: time })
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    getRandomIntMM: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}