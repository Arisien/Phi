const { MessageEmbed } = require('discord.js');

module.exports = class extends MessageEmbed {
  constructor (message = null, color = "#242424") {
    super();
    super.setColor(color);
    if(message != null) super.setDescription(message);
  }
}
