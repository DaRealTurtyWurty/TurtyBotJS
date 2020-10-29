module.exports = {
    name: "wash",
    aliases: ["purge", "nuke", "clear", "clean", "wipe", "flush"],
    category: "moderation",
    description: "Deletes messages from a channel.",
    run: async(client, message, args) => {
        if(message.deletable) message.delete();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission to delete messages!").then(m => m.delete({ timeout: 15000 }));
        if(isNaN(args[0]) || parseInt(args[0]) <= 0) return message.reply("Please enter a valid number of messages.").then(m => m.delete({ timeout: 15000 }));
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I do not have permission to delete messages, sorry!").then(m => m.delete({ timeout: 15000 }));
        let deleteAmount;
        if(parseInt(args[0]) > 100) deleteAmount = 100; else deleteAmount = parseInt(args[0]);
        message.channel.bulkDelete(deleteAmount, true).catch(err => message.reply(`Something went wrong... Here is the error: ${err}`));
    }
}