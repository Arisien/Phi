const Embed = require('../api/embed.js');
const main = require('../../main.js');

module.exports = {
    name: 'info',
    description: 'Get info on certain command',
    run (message, args) {
        if (args.length == 0) return message.channel.send(new Embed('No input command entered'));
        if (!main.phi.commands.has(args[0].toLowerCase())) return message.channel.send(new Embed(`Unrecognized input command ${args[0]}`));
        message.channel.send(new Embed(main.phi.commands.get(args[0].toLowerCase()).description));
    }
}