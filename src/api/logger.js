const chalk = require('chalk');

module.exports = class Logger {

    constructor () {
        console.log();
    }

    info (message) {
        console.info(chalk.blue("[INFO] ") + message);
    }

    warn (message) {
        console.warn(chalk.yellow("[WARN] ") + message);
    }

    error (message) {
        console.error(chalk.red("[ERROR] ") + message);
    }

    terminate (message) {
        this.error(message);
        process.exit();
    }
}