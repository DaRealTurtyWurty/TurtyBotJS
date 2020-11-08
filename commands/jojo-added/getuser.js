const Discord = require("discord.js");

module.exports = {
    name: "getuser",
    category: "info",
    description: "Find a user",
    run: async (client, message, args) => {
        const user = client.users.cache.find(user => user.username == args[0])
        if (user == undefined) {
            message.channel.send(`Could not find ${args[0]} in the cache`)
            return
        }
        console.log(user)
    }
}