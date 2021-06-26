const Embed = require('../api/embed');
const phi = require('../../main');

module.exports = {
    name: 'info',
    description: 'Get information on a certain command',
    usage: '[command]',
    run (message, args) {
        if (args.length == 0) return message.channel.send(Embed.error('No input command entered'));

        if (!phi.commands.has(args[0].toLowerCase())) return message.channel.send(Embed.error(`Unknown command ${args[0]}`));
        
        message.channel.send(new Embed(phi.commands.get(args[0].toLowerCase()).description));
    }
}