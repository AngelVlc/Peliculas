var Database = require('../database')

var database = new Database();

var MastersDataAccess = function () {
    this.insertItem = function (masterTableName, name, remarks, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var newItem = { name: name, remarks: remarks }

            connection.query('INSERT INTO ' + masterTableName + ' SET ?', newItem, function (err, result) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, result.insertId)
            })
        })
    }

    this.getById = function (masterTableName, id, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return 
            }

            connection.query('SELECT id, name, remarks FROM ' + masterTableName + ' WHERE id = ?', [id], function (err, rows) {
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

    this.getAll = function (masterTableName, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('SELECT id, name FROM ' + masterTableName, function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, rows)
            })
        })
    }

    this.updateItem = function (masterTableName ,id, name, remarks, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

                connection.query('UPDATE ' + masterTableName + ' SET name = ?, remarks = ? WHERE id = ?', [name, remarks, id], function (err, result) {
                    connection.release();
                    if (err) {
                        callback(err)
                        return 
                    }

                    callback(null, result.changedRows)
                })

        })
    }

    this.deleteItem = function (masterTableName, id, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('DELETE FROM ' + masterTableName + ' WHERE id = ?', id, function (err, result) {
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

module.exports = MastersDataAccess