var util = require('util');

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable does not exist')
}

var mysql = require('mysql');
var pool = mysql.createPool(process.env.DATABASE_URL)

var Database = function () {
    var self = this

    this.insertUser = function (userName, hashedPassword, isAdmin, callback) {
        pool.getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
            }

            var newUser = { userName: userName, password: hashedPassword, isAdmin: isAdmin }

            connection.query('INSERT INTO users SET ?', newUser, function (err, rows) {
                connection.release();                
                if (err) {
                    callback(err)
                }

                callback(null, newUser.userName)
            })
        })
    }

    this.getUserByUserName = function (userName, callback) {
        pool.getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
            }

            connection.query('SELECT * FROM users WHERE userName = ?', [userName], function (err, rows) {
                connection.release();                
                if (err) {
                    callback(err)
                }

                if (!rows) {
                    callback(null, null)                    
                } else {
                    callback(null,  rows[0])
                }
            })
        })
    }

    this.getUsers = function (callback) {
        pool.getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
            }

            connection.query('SELECT userId, userName, isAdmin FROM users', function (err, rows) {
                connection.release();                
                if (err) {
                    callback(err)
                }

                callback(null, rows)
            })
        })
    }

}

module.exports = Database;