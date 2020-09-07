//Require Discord js
const Discord = require('discord.js');

//Json config to make things smoother
const config = require('./config.json');

//Get file system
const fs = require('fs');

//Create client(Bot)
const client = new Discord.Client();

//Setup for commands folder to find and execute commands within that folder
client.commands = new Discord.Collection();

const commandCenter = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandCenter){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
/////////

//AdminJoe is ready and online
client.once('ready', ()=>{
    console.log('AdminJoe is here');
});


//Figure out what command the user sent and execute that command
client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot){
        return;
    }

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if(command == 'kick'){
        client.commands.get('kick').execute(message, args, client);
    }
    else if(command == 'ban'){
        client.commands.get('ban').execute(message, args, client);
    }
    else if(command == 'help'){
        client.commands.get('help').execute(message, args);
    }
    else if(command == 'commands'){
        client.commands.get('commands').execute(message, args);
    }

});







//Bot login (MUST BE AT END)
client.login(config.token);