const phi = require('../../main');
const logger = require('../util/logger');

module.exports = {
    event: 'message',
    run: function (message) {
        if(message.author.bot) return;

        if(message.content.startsWith(phi.config.prefix)){
            const command = message.content.split(' ')[0].slice(phi.config.prefix.length);
            const args = message.content.split(' ').slice(1);

            logger.info(`${message.author.username} ran ${command}`);

            if(phi.commands.has(command)){
                phi.commands.get(command).run(message, args);
            }
        }
    }
}