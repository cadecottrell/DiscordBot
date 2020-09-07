module.exports.run ={
    name: 'unban',
    description: "Ping the bot to determine if it is running",
    run: async(message, args, client) =>{

        let messenger = message.member.permissions;
        let bans = await message.guild.fetchBans();

        if(messenger.has("BAN_MEMBERS") && args.length == 1){
            
            //Searches for a potential user to unban
            var findUser = getUserFromMention(args[0], client, message);

            if(bans.get(findUser)){
                //Unbans User
                message.guild.members.unban(findUser);
                message.channel.send(`${findUser.name} has been unbanned.`);
            }
            else if(!(bans.get(findUser))){
                message.channel.send(`That user is not in the ban logs.`);
            }

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