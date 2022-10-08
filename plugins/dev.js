const Embed = require('../src/api/embed');
const { exec } = require('child_process');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

const phi = require('../main');

const config = require('./dev.json').config;

const hasPermission = (message) => {
	if (message.author.id == config.id) return true;
	return false;
}

const icon = `
   ▄███████▄    ▄█    █▄     ▄█   
  ███    ███   ███    ███   ███   
  ███    ███   ███    ███   ███▌  
  ███    ███  ▄███▄▄▄▄███▄▄ ███▌  
▀█████████▀  ▀▀███▀▀▀▀███▀  ███▌  
  ███          ███    ███   ███   
  ███          ███    ███   ███   
 ▄████▀        ███    █▀    █▀    
`;

module.exports = {
	commands: [
		{
			name: 'neofetch',
			description: 'Get list of commands',
			usage: '',
			run (message, args) {
				if (!hasPermission(message)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
				
				const data = [];
		
				// username@hostname
				data.push(os.userInfo().username + '@' + os.hostname);
				
				// ----------------
				let dashes = '';
				for (let i = 0; i < data[0].length; i++) dashes += '-';
				data.push(dashes);
		
				// Instance: C8A723
				data.push('Instance: ' + phi.instance);
		
				// Uptime: 2 hours
				let uptime = process.uptime();
				
				let units = ["seconds", "minutes", "hours", "days"];
				let values = [60, 60, 24];
		
				let value = 0;
		
				while (uptime > values[value] && value < values.length) {
					uptime /= values[value];
					value++;
				}
		
				let unit = units[value];
				uptime = Math.floor(uptime);
				if (uptime == 1) unit = unit.substring(0, unit.length -1);
		
				data.push('Uptime: ' + uptime + ' ' + unit);
		
				// OS: ArchLinux
				let platform = os.platform();
		
				if (platform == "win32") platform = "Windows";
		
				data.push('OS: ' + platform + " " + os.release());
		
				// Home: B293A4
				let unhashed = process.cwd() + data[4] + process.env.NUMBER_OF_PROCESSORS + process.env.PROCESSOR_ARCHITECTURE + process.env.PROCESSOR_IDENTIFIER + process.env.PROCESSOR_LEVEL + process.env.PROCESSOR_REVISION;
				let hash = crypto.createHash('md5').update(unhashed).digest('hex').toUpperCase();
				let subhash = hash.slice(hash.length - 6);
		
				data.push('Home: ' + subhash);
		
				// Version: 1.0.0
				data.push('Version: ' + require('../package.json').version);

				// // Shell: /bin/bash
				// data.push('Shell: ' + os.userInfo().shell);
		
				// // CPU: Intel Core i5 @ 4 GHz
				// data.push('CPU: ' + os.cpus()[0].model);
		
				// Memory: 100 MB / 15 GB
				data.push('Memory: ' + Math.floor((os.totalmem()-os.freemem())/1000000) + 'MB / ' + Math.floor(os.totalmem()/1000000) + 'MB');
		

				const arr = icon.split('\n');
		
				for (let i = 0; i < data.length; i++) {
					arr[i+1] += data[i];
				}
		
				const final = arr.join('\n');
		
				message.channel.send("```" + final + "```");
			}
		},		
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
