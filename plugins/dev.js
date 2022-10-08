const Embed = require('../src/api/embed');
const { exec } = require('child_process');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');

const config = require('./dev.json').config;

const hasPermission = (message) => {
	if (message.author.id == config.id) return true;
	return false;
}

module.exports = {
	commands: [
		{
			name: 'restart',
			description: 'restarts the bot',
			usage: '',
			async run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				await message.channel.send(new Embed('Restarting Phi'));
				exec('npm start');
				process.exit();
			}
		},
		{
			name: 'terminate',
			description: 'terminate this instance',
			usage: '',
			async run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				await message.channel.send(new Embed('Terminating Phi'));
				process.exit();
			}
		},
		{
			name: 'read',
			description: 'fetch file from system',
			usage: '[path]',
			run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				if (args.length != 1) return message.channel.send(Embed.error('No file path passed'));
				if (!fs.existsSync(args[0])) return message.channel.send(Embed.error('Invalid file path sent'));

				const attachment = new MessageAttachment(args[0]);

				message.channel.send(attachment);
			}
		},
		{
			name: 'write',
			description: 'write file to system',
			usage: '[path]',
			async run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				if (args.length != 1) return message.channel.send(Embed.error('No file path passed'));

				if (message.attachments.first()) {
					const attachment = message.attachments.first();

					const res = await fetch(attachment.url);

					const fileStream = fs.createWriteStream(args[0]);

					await new Promise((resolve, reject) => {
						res.body.pipe(fileStream);
						res.body.on("error", reject);
						res.body.on("finish", resolve);
					});
				}
				else return message.channel.send(Embed.error('No file attached'));
			}
		},
		{
			name: 'ls',
			description: 'list directory in system',
			usage: '[path]',
			run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				if (args.length != 1) args[0] = './';
				if (!fs.existsSync(args[0])) return message.channel.send(Embed.error('Invalid directory path'));

				const directory = fs.readdirSync(args[0]);

				let files = "";

				for (const file of directory) {
					files += file + " ";	
				}

				message.channel.send(new Embed(files));
			}
		},
		{
			name: 'exec',
			description: 'execute a process in system',
			usage: '[command]',
			run (message, args) {	
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));

				if (args.length == 0) return message.channel.send(Embed.error('No command passed'));
				
				exec(args.join(" "));
			}
		}
	]
}
