"use strict";
console.log(`

   ▄███████▄    ▄█    █▄     ▄█  
  ███    ███   ███    ███   ███  
  ███    ███   ███    ███   ███▌ 
  ███    ███  ▄███▄▄▄▄███▄▄ ███▌ 
▀█████████▀  ▀▀███▀▀▀▀███▀  ███▌ 
  ███          ███    ███   ███  
  ███          ███    ███   ███  
 ▄████▀        ███    █▀    █▀   
                               
`);

console.log('Created by https://github.com/Arisien\n');

const Phi = require('./src/phi.js')
const config = require('./config.json');

const phi = new Phi(config);

module.exports = phi;

phi.init();