const { Channel } = require('discord.js');
const Entry = require('./entry');
const fs = require('fs');

module.exports = class Logger {
    constructor (phi) {
        this.phi = phi;

        this.date = new Date();
        this.file = `./logs/${this.date.getTime()}.log`;
        this.channel = this.phi.config.logchannel;
        this.queue = [];

        if (this.channel == undefined) this.channel = null;

        const entry = new Entry(`Phi Initializing`);
        this.queue.push(entry);

        if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
        fs.writeFileSync(this.file, entry.plain() + '\n');
    }
    log (message, type = 'LOG', color = '#0CBDC0') {
        const entry = new Entry(message, type, color);

        console.log(entry.chalk());

        fs.appendFileSync(this.file, entry.plain() + '\n');

        if (this.channel == null) return;
        
        if (this.channel instanceof Channel) {
            this.channel.send(entry.embed());
        }

        else this.queue.push(entry);
    }
    info (message) {
        this.log(message, "INFO", '#4D79FF');
    }
    warn (message) {
        this.log(message, "WARN", '#FF9838');
    }
    error (message) {
        this.log(message, "ERROR", '#E14747');
    }
    terminate (message, status = 1) {
        this.error(message);
        process.exit(status);
    }
}