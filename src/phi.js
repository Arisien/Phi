const { Client, Collection } = require('discord.js');
const Logger = require('./api/logger.js');
const fs = require('fs');

module.exports = class Phi extends Client {
    constructor (config) {
        super();

        this.config = config;

        this.commands = new Collection();

        this.logger = new Logger();

        this.initialized = false;
    }

    login () {
        if (this.config.token == undefined) this.logger.terminate("No discord token")

        super.login(this.config.token);
    }

    loadCommands () {
        if (!fs.existsSync('./src/commands')) this.logger.terminate("No commands folder")

        const dir = fs.readdirSync('./src/commands');

        for(const file of dir){
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    loadListeners () {
        if (!fs.existsSync('./src/listeners')) this.logger.terminate("No listeners folder");

        const dir = fs.readdirSync('./src/listeners');

        for(const file of dir){
            const listener = require(`./listeners/${file}`);
            this.on(listener.event, listener.run);
        }
    }

    loadPlugins () {
        if (!fs.existsSync('./plugins')) return this.logger.info("No plugins detected");

        const dir = fs.readdirSync('./plugins');

        let count = 0;

        for(const file of dir){
            const plugin = require(`../plugins/${file}`);

            for (const command of plugin.commands) {
                this.commands.set(command.name, command);
            }

            for (const listener of plugin.listeners) {
                this.on(listener.event, listener.run);
            }

            count++;
        }

        this.logger.info(count + " plugins loaded");
    }

    init () {
        if (this.initialized) return;

        this.login();

        this.loadCommands();

        this.loadListeners();

        this.loadPlugins();

        this.initialized = true;

        this.logger.info("Phi initialized");
    }
}