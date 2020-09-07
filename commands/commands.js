const Discord = require('discord.js');

module.exports ={
    name: 'commands',
    description: "Lists the commands the AdminJoe understands",
    execute(message, args){
        const embedMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("AdminJoe's Commands")
        .addField("/ping", "Check to see if AdminJoe is online.")
        .addField("/help", "For help understanding how AdminJoe works.")
        .addField("/kick @user", "Kicks a user off the server.")
        .addField("/ban @user", "Bans a user, the user is unable to join back; unless the user is unbanned.")
        .addField("/unban @user", "Unbans the user that was previously banned");
        message.channel.send(embedMessage);
    }
}