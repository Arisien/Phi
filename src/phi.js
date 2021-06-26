const { Client, Collection } = require('discord.js');
const Database = require('./api/database');
const logger = require('./util/logger');
const fs = require('fs');

module.exports = class Phi extends Client {
    constructor (config) {
        super();

        if (!config.database) logger.terminate('No database in config');

        if (!config.token) logger.terminate('No discord token in config');

        if (!config.prefix) {
            logger.warn('No prefix in config, using -');
            config.prefix = '-';
        }

        this.config = config;

        this.commands = new Collection();

        this.database = new Database(config.database);

        this.initialized = false;
    }

    login () {
        super.login(this.config.token);
    }

    loadCommands () {
        if (!fs.existsSync('./src/commands')) logger.terminate("No commands folder")

        const dir = fs.readdirSync('./src/commands');

        for(const file of dir){
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    loadListeners () {
        if (!fs.existsSync('./src/listeners')) logger.terminate("No listeners folder");

        const dir = fs.readdirSync('./src/listeners');

        for(const file of dir){
            const listener = require(`./listeners/${file}`);
            this.on(listener.event, listener.run);
        }
    }

    loadPlugins () {
        if (!fs.existsSync('./plugins')) return logger.info("No plugins detected");

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

        logger.info(count + " plugins loaded");
    }

    init () {
        if (this.initialized) return;

        this.login();

        this.loadCommands();

        this.loadListeners();

        this.loadPlugins();

        this.initialized = true;

        logger.info("Phi initialized");
    }
}