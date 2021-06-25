const main = require('../../main.js');

module.exports = {
    event: 'message',
    run: function (message) {
        if(message.author.bot) return;

        if(message.content.startsWith(main.phi.config.prefix)){
            const command = message.content.split(' ')[0].slice(main.phi.config.prefix.length);
            const args = message.content.split(' ').slice(1);

            main.phi.logger.info(`${message.author.username} ran ${command}`);

            if(main.phi.commands.has(command)){
                main.phi.commands.get(command).run(message, args);
            }
        }
    }
}