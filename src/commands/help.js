const Embed = require('../api/embed');
const phi = require('../../main');

module.exports = {
    name: 'help',
    description: 'Get list of commands',
    usage: '',
    run (message, args) {
        message.channel.send(new Embed('To be added'));
    }
}
