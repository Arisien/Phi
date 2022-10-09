const { Client, Collection } = require('discord.js');
const Logger = require('./api/logger');

const path = require('path');
const fs = require('fs');

module.exports = class Phi extends Client {
    constructor (config) {
        super();
        
        this.initialized = false;

        this.config = config;

        this.logger = new Logger(this);

        this.commands = new Collection();

	    this.listeners = new Collection();

	    this.plugins = new Collection();

        this.dir = path.join(__dirname, '..');
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
        const dir = path.join(this.dir, 'src', 'commands');

        if (!fs.existsSync(dir)) return this.logger.error(`No commands folder at ${dir}`);

        for(const file of fs.readdirSync(dir)) {
            const command = require(path.join(dir, file));
            this.commands.set(command.name, command);
        }
    }

    loadListeners () {
        const dir = path.join(this.dir, 'src', 'listeners');

        if (!fs.existsSync(dir)) return this.logger.error(`No listeners folder at ${dir}`);

        for(const file of fs.readdirSync(dir)){
            const listener = require(path.join(dir, file));
            this.on(listener.event, listener.run);
        }
    }

    loadPlugins () {
        const dir = path.join(this.dir, 'plugins');

        if (!fs.existsSync(dir)) return this.logger.warn('No plugins folder detected');

        const pluginDirs = fs.readdirSync(dir).filter(file => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });

        for (const pluginDir of pluginDirs) {

            if (!fs.existsSync(path.join(dir, pluginDir, 'package.json'))) {
                this.logger.error(`Invalid plugin being loaded: ${pluginDir}`);
                continue;
            }

            const pkg = require(path.join(dir, pluginDir, 'package.json'));

            if (pkg.dependencies) {
                let load = true;
                for (const dependency of pkg.dependencies) {
                    if (!fs.existsSync(path.join(this.dir, 'node_modules', dependency))) {
                        this.logger.error(`Plugin ${pkg.name} requires dependency ${dependency}`);
                        load = false;
                        break;
                    }
                }
                if (!load) continue;
            }

            if (!fs.existsSync(path.join(dir, pluginDir, pkg.main))) {
                this.logger.error(`Could not find source file for plugin ${pkg.name} at ${path.join(dir, pluginDir, pkg.main)}`);
                continue;
            }

            const plugin = require(path.join(dir, pluginDir, pkg.main));

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
        }
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
