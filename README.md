# Phi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Phi is a modular discord bot coded in JavaScript. The bot is designed for easy implementation of plugins, as well as lots of customization for both the host and the bot users. The project requires NodeJS as a JavaScript runtime and for importing packages, as well as  MySQL for hosting the bot's database.

* *DISCLAIMER: Phi is in early development and has not been thoroughly tested for bugs. Moreover, not all features have been fully implemented*

## Configuration

In order to run Phi, a `config.json` file must be created. The following is an example of a `config.json` where all sensitive information has been left out:  

```json
{
    "token": "",
    "prefix": "-",
    "database": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "phidb"
    }
}
```

* `token`: The token of your Discord bot, get it at https://discord.com/developers.
* `prefix`: The prefix of your bot's commands.
* `database`: An object containing the configuration for your MySQL database. Currently, the bot must be linked to an existing database and will not yet create its own.

## Usage

*NodeJS and MySQL are required to run Phi*

* Clone the repository with `git clone https://github.com/Arisien/Phi.git`
* Install all dependencies using `npm ci`
* Fill in the `config.json` file with necessary data
* Run Phi with `npm run start`

## Contributors

* [Arisien](https://github.com/Arisien) - Main developer

## License
Phi is licensed under the [MIT](LICENSE) license. Feel free to fork the repository or modify the code as you see fit.