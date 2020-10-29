const { MessageEmbed, Collection } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["commands", "commandlist"],
    category: "info",
    description: "Gets a list of all the commands or a specific command.",
    usage: "[command | alias]",
    run: async(client, message, args) => {
        if(args[0]) return getCMD(client, message, args[0]);
        else getAll(client, message);
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM");

    client.categories.forEach(category => {
        let commands = " ";

        client.commands.filter(command => command.category === category).forEach(command => {
            if(command.category === category) {
                commands += "`" + command.name + "`, ";
            }
        });

        commands  = commands.replace(/, $/, " ");

        embed.addField(category, commands, false);
    });

    return message.channel.send(embed);
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for command **${input.toLowerCase()}**`;

    if(!cmd) return message.channel.send(embed.setColor("RED").setDescription(info));

    if(cmd.name) info = `**Command Name**: ${cmd.name}`;
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if(cmd.description) info += `\n**Description**: ${cmd.description}`;
    if(cmd.usage) info += `\n**Usage**: ${cmd.usage}`; embed.setFooter(`Syntax: <> = required, [] = optional`);
    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}