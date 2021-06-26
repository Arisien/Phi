const chalk = require('chalk');

exports.info = function (message) {
    console.info(chalk.blue("[INFO] ") + message);
}

exports.warn = function (message) {
    console.warn(chalk.yellow("[WARN] ") + message);
}

exports.error = function (message) {
    console.error(chalk.red("[ERROR] ") + message);
}

exports.terminate = function (message) {
    this.error(message);
    process.exit();
}