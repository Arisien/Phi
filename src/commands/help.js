const Embed = require('../api/embed');
const phi = require('../../main');

module.exports = {
    name: 'help',
    description: 'Get list of commands',
    usage: '(page)',
    run (message, args) {
        const pagesize = 10;

        const commands = phi.commands.array();

        let page = 1;

        if (args.length > 0 && !isNaN(args[0])) {
            page = parseInt(args[0]);
        }

        let text = '';

        for (let i = 0; i < pagesize; i++) {
            const command = commands[(page-1)*pagesize + i];
            if (!command) break;
            text += `${phi.config.prefix}${command.name}: ${command.description}\n`;
        }

        const embed = Embed.rich(`Help (${page}/${Math.ceil(commands.length / pagesize)})`, text)

        message.channel.send(embed);

    }
}