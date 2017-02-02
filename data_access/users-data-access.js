var Database = require('../database')

var database = new Database();

var UsersDataAccess = function () {
    this.insertUser = function (userName, hashedPassword, isAdmin, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var newUser = { userName: userName, password: hashedPassword, isAdmin: isAdmin }

            connection.query('INSERT INTO users SET ?', newUser, function (err, result) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, result.insertId)
            })
        })
    }

    this.getUserByUserName = function (userName, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('SELECT * FROM users WHERE userName = ?', [userName], function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return
                }

                if (!rows) {
                    callback(null, null)
                } else {
                    callback(null, rows[0])
                }
            })
        })
    }

    this.getUserById = function (userId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return 
            }

            connection.query('SELECT userId, userName, isAdmin FROM users WHERE userId = ?', [userId], function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                if (!rows) {
                    callback(null, null)
                } else {
                    callback(null, rows[0])
                }
            })
        })
    }

    this.getUsers = function (callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('SELECT userId, userName, isAdmin FROM users', function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, rows)
            })
        })
    }

    this.updateUser = function (userId, userName, password, isAdmin, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            if (password) {
                connection.query('UPDATE users SET userName = ?, isAdmin = ?, password = ? WHERE userId = ?', [userName, isAdmin, password, userId], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(err)
                        return 
                    }

                    callback(null, result.changedRows)
                })
            } else {
                connection.query('UPDATE users SET userName = ?, isAdmin = ? WHERE userId = ?', [userName, isAdmin, userId], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(err)
                        return 
                    }

                    callback(null, result.changedRows)
                })
            }
        })
    }

    this.deleteUser = function (userId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('DELETE FROM users WHERE userId = ?', userId, function (err, result) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, result.affectedRows)
            })
        })
    }
}

module.exports = UsersDataAccess