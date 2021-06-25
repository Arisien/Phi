const main = require('../../main.js');

module.exports = {
    event: 'ready',
    run: function () {
        main.phi.logger.info('Logged into Discord');
    }
}