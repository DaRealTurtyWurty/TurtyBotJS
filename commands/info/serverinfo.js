const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["server", "guildinfo"],
    category: "info",
    description: "Get informtion about the server",
    usage: "[Page Number - there are 2 pages]",
    run: async(client, message, args) => {
        let guild = message.guild;

        let afkChannel = guild.afkChannel;
        if(!afkChannel) afkChannel = "None";
        else afkChannel = afkChannel.name;

        let description = guild.description;
        if(!description) description = "N/A";

        let publicUpdatesChannel = guild.publicUpdatesChannel;
        if(!publicUpdatesChannel) publicUpdatesChannel = "None";
        else publicUpdatesChannel = publicUpdatesChannel.name;

        let rulesChannel = guild.rulesChannel;
        if(!rulesChannel) rulesChannel = "None";
        else rulesChannel = rulesChannel.name;

        let systemChannel = guild.systemChannel;
        if(!systemChannel) systemChannel = "None";
        else systemChannel = systemChannel.name;

        let widgetChannel = guild.widgetChannel;
        if(!widgetChannel) widgetChannel = "None";
        else widgetChannel = widgetChannel.name;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(guild.iconURL())
            .setFooter(/*message.author.tag, message.author.displayAvatarURL()*/ `Developed by Turty Wurty`)
            .setTimestamp()
            .setTitle(`Info for ${guild.name}`);
        
        if(!args[0] || args[0] != 2) {
            embed.addField("AFK Channel Name:", afkChannel || "None", true)
                .addField("AFK Timeout:", guild.afkTimeout, true)
                .addField("Application ID:", guild.applicationID || "N/A", true)
                .addField("Is available:", guild.available.toString().replace("false", "No").replace("true", "Yes"), true)
                .addField("Banner Hash:", guild.banner || "N/A", true)
                .addField("Channel Count:", guild.channels.cache.array().length, true)
                .addField("Guild's Client:", guild.client.displayName || guild.client.username || "N/A", true)
                .addField("Default Message Notifications:", guild.defaultMessageNotifications.replace("ALL", "All").replace("MENTIONS", "Mentions"), true)
                .addField("Is bot removed:", guild.deleted.toString().replace("false", "No").replace("true", "Yes"), true)
                .addField("Discovery Hash:", guild.discoverySplash || "N/A", true)
                .addField("Emoji Count:", guild.emojis.cache.array().length, true)
                .addField("Explicit Content Level:", guild.explicitContentFilter.replace("DISABLED", "None").replace("MEMBERS_WITHOUT_ROLES", "Members without roles").replace("ALL_MEMBERS", "All Members"), true)
                .addField("Server Icon Hash:", guild.icon, true)
                .addField("Server ID:", guild.id, true)
                .addField("Is \"large\":", guild.large, true)
                .addField("Member Count:", guild.memberCount, true)
                .addField("MFA Level:", guild.mfaLevel, true)
                .addField("Server Name:", guild.name, true)
                .addField("Name Acronym:", guild.nameAcronym, true)
                .addField("Owner Name:", guild.owner.displayName || guild.owner.user.username, true)
                .addField("Owner ID:", guild.ownerID, true)
                .addField("Is Partnered:", guild.partnered.toString().replace("false", "No").replace("true", "Yes"), true)
                .addField("Preferred Locale:", guild.preferredLocale || "en-US", true)
                .addField("Boost Count:", guild.premiumSubscriptionCount, true)
                .addField("Boost Tier:", guild.premiumTier.toString().replace("NONE", "None").replace("TIER_1", "Tier 1").replace("TIER_2", "Tier 2").replace("TIER_3", "Tier 3"), true);
        } else {
            embed.addField("Presence Count:", guild.presences.cache.array().length, true)
                .addField("Public Update Channel:", publicUpdatesChannel, true)
                .addField("Server Region:", guild.region, true)
                .addField("Role Count:", guild.roles.cache.array().length, true)
                .addField("Highest Role:", guild.roles.highest.name, true)
                .addField("Rules Channel:", rulesChannel, true)
                .addField("Shard ID:", guild.shard.id, true)
                .addField("Splash Hash:", guild.splash || "N/A", true)
                .addField("System Channel:", systemChannel, true)
                .addField("Vanity URL:", guild.vanityURLCode || "N/A", true)
                .addField("Verification Level:", guild.verificationLevel.toString().replace("NONE", "None").replace("LOW", "Low").replace("MEDIUM", "Medium").replace("HIGH", "High").replace("VERY_HIGH", "Very High"), true)
                .addField("Is verified:", guild.verified.toString().replace("false", "No").replace("true", "Yes"), true)
                .addField("No. Voice States:", guild.voiceStates.cache.array().length, true)
                .addField("Widget Channel:", widgetChannel, true)
                .addField("Description:", description, false)
                .addField("Created At:", guild.createdAt, false);
        }

        return message.reply(embed).then(message.delete()).then(m => m.delete({ timeout: 15000 }));
    }
}
