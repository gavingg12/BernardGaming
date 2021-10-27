module.exports = {
    helpCommand: (message, MessageEmbed) => {
        var gavin = "530188818733727774";
        var tom = "578935696518152193";

        const helpEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Bernard - Help')
        .setDescription(`Bernard is a pro bot that keeps track of scams spread throughout Discord. We will be adding more to the bot as our server and the number of servers it\'s in grows.\nhttps://tomm27m.gitbook.io/bernard/\n\nBernard was created by <@${tom}> and <@${gavin}>.\nIf you would like to support the growth of our scam awareness server and the bot, click [here](https://discord.gg/pjHtvuAYGW)!`)
        .setThumbnail('https://cdn.discordapp.com/app-icons/900253555372486657/3dbd07ea1d5045822e0450bdff789c95.png')
        .setTimestamp();
        message.channel.send(helpEmbed);

        return;
    }
}