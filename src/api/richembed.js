const { MessageEmbed } = require('discord.js');
const main = require('../../main.js');

module.exports = class extends MessageEmbed {
  constructor (title, message, color = "#242424") {
    super();
    super.setColor(color);
    super.setTitle(title);
    super.setDescription(message);
    super.setFooter("© Phi 2021", main.phi.user.avatarURL);
    super.setTimestamp(new Date());
  }
}
