const phi = require('../../main.js');
const logger = require('../util/logger');

module.exports = {
    event: 'ready',
    run: function () {
        logger.info('Logged into Discord');

        phi.user.setActivity(`${phi.config.prefix}help`);
    }
}