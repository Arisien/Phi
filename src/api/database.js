const mysql = require('mysql');
const logger = require('../util/logger');

module.exports = class Database {

    constructor (config) {

        let con = mysql.createConnection(config);

        con.connect(function(err) {
            if (err) throw err;
            logger.info("Connected to MySQL"); 
        });

        this.connection = con;

    }

}