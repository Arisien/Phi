const Embed = require('../api/embed');
const phi = require('../../main.js');

module.exports = {
    event: 'ready',
    run: function () {
        this.logger.info('Logged into Discord');

        // User activity setup
        phi.user.setActivity(`${phi.config.prefix}help`);

        // Phi log channel setup
        phi.logger.channel = phi.channels.cache.get(phi.logger.channel);
        
        if (!phi.logger.channel) {
            phi.logger.channel = null;
        }

        else while (phi.logger.queue.length > 0) {
            const entry = phi.logger.queue.shift();
            phi.logger.channel.send(entry.embed());
        }

    }
}
