var util = require('util');
var EventEmitter = require('events').EventEmitter;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable does not exist')
}

var mysql = require('mysql');
var pool = mysql.createPool(process.env.DATABASE_URL)

var Database = function () {
    var self = this

    this.insertUser = function (userName, hashedPassword, isAdmin) {
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err
            }

            var newUser = { userName: userName, password: hashedPassword, isAdmin: isAdmin }

            connection.query('INSERT INTO users SET ?', newUser, function (err, rows) {
                if (err) {
                    connection.release();
                    throw err
                }

                self.emit('userCreated', newUser.userName);
            })
        })
    }

    this.getUserByUserName = function (userName) {
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err
            }

            connection.query('SELECT * FROM users WHERE userName = ?', [userName], function (err, rows) {
                connection.release();                
                if (err) {
                    throw err
                }

                if (!rows) {
                    self.emit('userFound', null);
                } else {
                    self.emit('userFound', rows[0]);
                }
            })
        })
    }

    this.getUsers = function () {
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err
            }

            connection.query('SELECT userId, userName, isAdmin FROM users', function (err, rows) {
                connection.release();                
                if (err) {
                    throw err
                }

                if (!rows) {
                    self.emit('usersGot', null);
                } else {
                    self.emit('usersGot', rows);
                }
            })
        })
    }

}

util.inherits(Database, EventEmitter)

module.exports = Database;