module.exports ={
    name: 'kick',
    description: "Kick a member out",
    execute(message, args, client){
        
        //Pre-emptively sets up messanger permissions to check which permissions this user has.
        let messenger = message.member.permissions;

        //checks to see if the messenger has kick members permission and actually sent a user to kick
        if(messenger.has("KICK_MEMBERS") && args.length == 1){
            
            //Searches for a potential user to kick
            var findUser = getUserFromMention(args[0], client, message);

            //If the user is not found
            if(!findUser){
                
                //If the messenger sent an argument with the mention format (@user)
                if(args[0].startsWith('@')){
                    return message.reply('User does not exist!');
                }
                //If they didn't use the mention format.
                else{
                    return message.reply(`Please be sure to mention (@user) to kick user.`);
                }
            }
            //Else if the user is found kick em!
            else{
                var kickedUser = message.guild.member(findUser);

                //Edge Case, recently kicked user retrieves a null from kickedUser.
                if(kickedUser !== null){
                    return kickedUser.kick().then(() =>{
                        message.reply(`${findUser.username} has been kicked.`);
                    });
                }
                //If it is returned null just ignore
                return;
            }
        }
        
        //If the messenger did not have the criteria for the command, figure out which one
        if(args.length < 1){
            return message.reply('You must mention (@user) a user!');
        }
        else{
            return message.reply('You do not have permission');
        }
        

        function getUserFromMention(mention, client, message){
            if(!mention){
                //Messenger did not user a mention
                return;
            }   

            //If it is a proper mention then it will have this format
            if(mention.startsWith('<@') && mention.endsWith('>')){
                mention = mention.slice(2, -1);

                if(mention.startsWith('!')){
                    mention = mention.slice(1);
                }

                return client.users.cache.get(mention);
            }
        }

    }
}