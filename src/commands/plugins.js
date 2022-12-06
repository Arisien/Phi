const Embed = require('../api/embed');
const phi = require('../../main');

module.exports = {
    name: 'plugins',
    description: 'List currently active Phi plugins',
    usage: '',
    run (message, args) {
        const plugins = Array.from(phi.plugins.keys());
        message.channel.send(new Embed(plugins.join('\n')));
    }
}