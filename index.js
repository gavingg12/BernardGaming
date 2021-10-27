const Discord = require("discord.js");
const keepAlive = require('./server.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const mongo = require('./mongo.js');
const BlacklistedLinks = require('./dataschema.js');
const validUrl = require('valid-url');
const linkCheck = require('link-check');

const helpDir = require('./commands/help.js');
const pingDir = require('./commands/ping.js');

client.on('ready', async () => {

  setInterval(() => {
    client.user.setActivity(`over ${client.guilds.cache.size} servers!`, { type: 'WATCHING' });
  }, 1000 * 60);

  console.log("======================\nOnline at:");
  var logdate = new Date();
  console.log(logdate.toLocaleString());
  
  mongo();
});

var prefix = "b!";

client.on("message", async message => {
    

    if (!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command){
      case 'help':
        helpDir.helpCommand(message, MessageEmbed);
      break;
      case 'ping':
        pingDir.pingCommand(message);
      break;
			case 'fortest':
				for (let x in args) {
					message.channel.send(args[x])
				}
			break;
    }
    if(command == "testfetch"){
      if(!args[0] || args[1]){
        message.channel.send("You must provide 1 link to test!");
        return;
      }
      else{
        if(validUrl.isUri(args[0])){
          linkCheck(args[0], async function (err, result) {

            if (err) {
              console.error(err);
              message.channel.send("An error has occured! Please check the console for more details.")
              return;
            }

            if(result.status == "dead"){
              message.channel.send("Dead URL.");
              return;
            }

            if(result.status == "alive"){
              const blacklistedlink = await BlacklistedLinks.find({ linkRequested: args[0] });
              if(args[0] == blacklistedlink[0].linkRequested){
                message.channel.send("Blacklisted link!");
                return;
              }
              else{
                message.channel.send("Not a blacklisted link!");
                return;
              }
            }
          });
        }
        else{
          message.channel.send("Not a valid URL!");
          return;
        }
      }
    }

    if(command == "testlink"){
      if(!args[0] || args[1]){
        message.channel.send("You must provide 1 link to blacklist!");
        return;
      }
      if(validUrl.isUri(args[0])){

        linkCheck(args[0], function (err, result) {
          if (err) {
            console.error(err);
            message.channel.send("An error has occured! Please check the console for more details.")
            return;
          }

        if(result.status == "dead"){

        const resultstatusdead = new MessageEmbed()
        .setColor('RED')
        .setTitle('URL results!')
        .setDescription(`=====================\nThe URL you have requested to scan is \*\*not responding\*\*!\nThis is due to 2 main reasons:\n-\n1) It is not a valid URL.\n-\n2) It is currently not online, but is a valid URL.\n\nYou may check again later if you believe that the second reason has caused this response.\n\nThank you for coming to Bernard!`)
        .setFooter(`${result.link} is the URL scanned.`)
        .setTimestamp();
        message.channel.send(resultstatusdead);

        return;
        }

        if(result.status == "alive"){

          const resultstatusalive = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('URL results!')
        .setDescription(`=====================\nThe URL you have requested to scan is \*\*responding\*\*!\nThis means that the URL exists, and it is currently online.\n\nThank you for coming to Bernard!`)
        .setFooter(`${result.link} is the URL scanned.`)
        .setTimestamp();
        message.channel.send(resultstatusalive);

        return;
        }
      });
    }
    else {
      message.channel.send("Not a legit url!");
      return;
    }
  }
    if(command == "testdb"){
      if(!args[0] || args[1]){
        message.channel.send("You must provide 1 link to blacklist!");
        return;
      }
      if(validUrl.isUri(args[0])){
        const newData = await BlacklistedLinks.create({
        sender: message.author.username,
        senderID: message.author.id,
        linkRequested: args[0]
        });
        message.channel.send("URL saved into database!");
        return;
      }
      else {
        message.channel.send("Not a valid URL!");
        return;
      }
    }
});

keepAlive();
client.login(process.env.TOKEN)