module.exports ={
    name: 'ban',
    description: "Ban the offending user",
    execute(message, args, client){
        //Pre-emptively sets up messanger permissions to check which permissions this user has.
        let messenger = message.member.permissions;

        if(messenger.has("BAN_MEMBERS") && args.length == 1){

            //Searches for a potential user to ban
            var findUser = getUserFromMention(args[0], client, message);

            //If the user is not found
            if(!findUser){
                
                //If the messenger sent an argument with the mention format (@user)
                if(args[0].startsWith('@')){
                    return message.reply('User does not exist!');
                }
                //If they didn't use the mention format.
                else{
                    return message.reply(`Please be sure to mention (@user) to ban user.`);
                }
            }
            //Else if the user is found ban em!
            else{

                var bannedUser = message.guild.member(findUser);

                //Edge Case, recently banned user retrieves a null from bannedUser.
                if(bannedUser !== null){
                    return bannedUser.ban().then(() =>{
                        message.reply(`${findUser.username} has been banned.`);
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