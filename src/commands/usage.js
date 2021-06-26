const Embed = require('../api/embed.js');
const phi = require('../../main.js');

module.exports = {
    name: 'usage',
    description: 'Get usage of a certain command',
    usage: '[command]',
    run (message, args) {
        if (args.length == 0) return message.channel.send(new Embed(`${phi.config.prefix}${this.name} ${this.usage}`));

        if (!phi.commands.has(args[0].toLowerCase())) return message.channel.send(Embed.error(`Unknown command ${args[0]}`));
        
        const command = phi.commands.get(args[0].toLowerCase());

        message.channel.send(new Embed(`${phi.config.prefix}${command.name} ${command.usage}`));
    }
}