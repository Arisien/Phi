const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = class Entry {
    constructor (message, type = 'LOG', color = '#0CBDC0') {
        this.message = message;
        this.type = type;
        this.color = color;
    }
    embed () {
        const embed = new MessageEmbed();
        embed.setDescription(this.message);
        embed.setColor(this.color);
        return embed;
    }
    chalk () {
        return chalk.hex(this.color)(`[${this.type.toUpperCase()}] `) + this.message;
    }
    plain () {
        return `[${this.type}] ${this.message}`;
    }
}