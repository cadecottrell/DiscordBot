module.exports ={
    name: 'ping',
    description: "Ping the bot to determine if it is running",
    execute(message, args){
        message.channel.send("pong!");
    }
}