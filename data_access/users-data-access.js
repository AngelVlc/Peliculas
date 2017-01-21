var Database = require('../database')

var database = new Database();


var UsersDataAccess = function () {
    this.insertUser = function (userName, hashedPassword, isAdmin, callback) {
        database.getPool().getConnection(function (conErr, connection) {
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
        database.getPool().getConnection(function (conErr, connection) {
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
        database.getPool().getConnection(function (conErr, connection) {
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

module.exports = UsersDataAccess