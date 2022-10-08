const Embed = require('../src/api/embed');

module.exports = {
	commands: [
		{
            name: 'kick',
            description: 'Remove a user from the server',
            usage: '[user]',
            run (message, args) {
                console.log('executed');
                let user = message.member;
                let target = message.mentions.members.first();
        
                if (!user.hasPermission('ADMINISTRATOR')) return message.channel.send(Embed.error('You are not an administrator'));
        
                if (target == null) return message.channel.send(Embed.error('No target specified'));
        
                if (target.hasPermission('ADMINISTRATOR')) return message.channel.send(Embed.error(`${target.displayName} is an administrator`));
        
                try {
                    target.kick();
                    message.channel.send(new Embed(`${target.displayName} was kicked`));
                } catch (e) {
                    console.error(e);
                    message.channel.send(Embed.error(`Unable to kick ${target.displayName}`));
                }
        
            }
        },
		{
            name: 'ban',
            description: 'Remove a user permanently from the server',
            usage: '[user]',
            run (message, args) {
                
                let user = message.member;
                let target = message.mentions.members.first();
        
                if (!user.hasPermission('ADMINISTRATOR')) return message.channel.send(Embed.error('You are not an administrator'));
        
                if (target == null) return message.channel.send(Embed.error('No target specified'));
        
                if (target.hasPermission('ADMINISTRATOR')) return message.channel.send(Embed.error(`${target.displayName} is an administrator`));
        
                try {
                    target.ban();
                    message.channel.send(new Embed(`${target.displayName} was banned`));
                } catch (e) {
                    console.error(e);
                    message.channel.send(Embed.error(`Unable to ban ${target.displayName}`));
                }
        
            }
        }
	]
}
