# Phi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Phi is a modular discord bot coded in JavaScript. The bot is designed for easy implementation of plugins, as well as lots of customization for both the host and the bot users. The project requires NodeJS as a JavaScript runtime and for importing packages.

* *DISCLAIMER: Phi is in early development and has not been thoroughly tested for bugs. Moreover, not all features have been fully implemented*

## Configuration

In order to run Phi, a `config.json` file must be created. The following is an example of a `config.json` where all sensitive information has been left out:  

```json
{
    "token": "",
    "prefix": "$",
    "logchannel": ""
}
```

* `token`: The token of your Discord bot, get it at https://discord.com/developers.
* `prefix`: The prefix of your bot's commands.
* `logchannel`: An optional string containing discord channel id that the bot will log to if set.

## Usage

*NodeJS is required to run Phi*

* Clone the repository with `git clone https://github.com/Arisien/Phi.git`
* Install all dependencies using `npm install`
* Fill in the `config.json` file with necessary data
* Run Phi with `npm run start`

## Todo

* Logger: remove bloated functionality. implement support for plugins to hook, listen, and utilize.

## Contributors

* [Arisien](https://github.com/Arisien) - Main developer

## License
Phi is licensed under the [MIT](LICENSE) license. Feel free to fork the repository or modify the code as you see fit.