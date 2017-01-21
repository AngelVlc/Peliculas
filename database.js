var util = require('util');

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable does not exist')
}

var mysql = require('mysql');
var pool = mysql.createPool(process.env.DATABASE_URL)

var Database = function () {
    this.getPool = function () {
        return pool
     }  
}

module.exports = Database