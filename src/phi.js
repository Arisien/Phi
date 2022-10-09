const { Client, Collection } = require('discord.js');
const Logger = require('./api/logger');
const fs = require('fs');

module.exports = class Phi extends Client {
    constructor (config) {
        super();
        
        this.initialized = false;

        if (!config.prefix) {
            this.logger.warn('No prefix found in config: using $');
            config.prefix = '$';
        }

        this.config = config;

        this.logger = new Logger(this);

        this.commands = new Collection();

	    this.listeners = new Collection();

	    this.plugins = new Collection();

    }

    instantiate () {
        const hex = new Date().getTime().toString(16).toUpperCase();
        this.instance = hex.slice(hex.length - 6);
    }

    login () {
        if (!this.config.token) this.logger.terminate('No discord token in config');

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

        let count = 0;

        const dirs = fs.readdirSync('./plugins').filter(function (file) {
            return fs.statSync(`./plugins/${file}`).isDirectory();
        });

        for (const dir of dirs) {

            if (!fs.existsSync(`./plugins/${dir}/package.json`)) {
                this.logger.error(`Invalid plugin being loaded: ${dir}`);
                continue;
            }

            const pkg = require(`../plugins/${dir}/package.json`);

            if (!pkg.name) {
                this.logger.error(`Invalid plugin being loaded: ${dir}`);
                continue;
            }

            if (pkg.dependencies) {
                let load = true;
                for (const dependency of pkg.dependencies) {
                    if (!fs.existsSync(`node_modules/${dependency}`)) {
                        this.logger.error(`Plugin ${pkg.name} requires dependency ${dependency}`);
                        load = false;
                        break;
                    }
                }
                if (!load) continue;
            }

            if (!fs.existsSync(`plugins/${dir}/${pkg.main}`)) {
                this.logger.error(`Could not find source file for plugin ${pkg.name} at plugins/${dir}/${pkg.main}`);
                continue;
            }

            const plugin = require(`../plugins/${dir}/${pkg.main}`);

            plugin.name = pkg.name;
            plugin.description = pkg.description;
            
            if (plugin.commands) {
            	for (const command of plugin.commands) {
                	this.commands.set(command.name, command);
                }
            }

            if (plugin.listeners) {
                for (const listener of plugin.listeners) {
                    this.on(listener.event, listener.run);
                }
            }

            this.plugins.set(plugin.name, plugin);

            this.logger.info(`Plugin ${plugin.name} loaded`);
    
            count++;
        }

        this.logger.info(count + " plugins loaded");

    }

    init () {
        if (this.initialized) return;

        this.instantiate();

        this.login();

        this.loadCommands();

        this.loadListeners();

        this.loadPlugins();

        this.initialized = true;

        this.logger.info("Phi initialized");
    }
}
