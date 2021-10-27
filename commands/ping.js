module.exports = {
    pingCommand: (message) => {
        message.reply("Pinging...").then((pingMessage) => {
            const givenPing = pingMessage.createdTimestamp - message.createdTimestamp;
            pingMessage.edit(`The ping of the bot is: ${givenPing}ms!`);
            return;
        });
    }
}