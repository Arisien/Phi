const Embed = require('../api/embed');

module.exports = {
    name: 'help',
    description: 'Lists bot\'s commands',
    run (message, args) {
        message.channel.send(new Embed('Sorry, no help yet'));
    }
}