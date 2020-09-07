const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports ={
    name: 'help',
    description: "Explains how to use bot",
    execute(message, args){
        const embedMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("AdminJoe's HelpDesk")
        .setDescription("AdminJoe recognizes commands with the prefix '/'.\nSo be sure to format the command as /[command].\nTo find out the commands type: /commands");
        message.channel.send(embedMessage);
    }
}