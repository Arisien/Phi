const { MessageEmbed } = require('discord.js');

module.exports = class Embed extends MessageEmbed {
  constructor (message = null, color = "#242424") {
    super();
    super.setColor(color);
    if(message != null) super.setDescription(message);
  }

  static error (message) {
    return new Embed (message, 0xe14747);
  }

  static info (message) {
    return new Embed (message, 0x4d58ff);
  }

  static warn (message) {
    return new Embed (message, 0xff9838);
  }
	
  static rich (title, message, color = "#242424"){
    const embed = new Embed (message, color);

    embed.setTitle(title);
    embed.setFooter("© Phi 2021", phi.user.avatarURL);
    embed.setTimestamp(new Date());

    return embed;
  }

}
