var Database = require('../database')

var database = new Database();

var FilmsDataAccess = function () {
    this.insertFilm = function (title, remarks, typeId, locationId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var newFilm = { title: title, remarks: remarks, typeId: typeId, locationId: locationId }

            connection.query('INSERT INTO films SET ?', newFilm, function (err, result) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, result.insertId)
            })
        })
    }

    this.getById = function (id, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return 
            }

            connection.query('SELECT id, title, typeId, locationId, remarks FROM films WHERE id = ?', [id], function (err, rows) {
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

    this.searchByTitle = function (searchTerm, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var query = 'SELECT f.id, f.title, f.typeId, f.locationId, t.name as typeName, l.name as locationName \
                         FROM films f \
                            INNER JOIN types t ON t.id = f.typeId \
                            INNER JOIN locations l ON l.id = f.locationId \
                         WHERE f.title LIKE ? \
                         ORDER BY f.title'

            connection.query(query, '%' + searchTerm + '%', function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, rows)
            })
        })
    }

    this.getByLocation = function (locationId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var query = 'SELECT f.id, f.title, f.typeId, f.locationId, t.name as typeName, l.name as locationName \
                         FROM films f \
                            INNER JOIN types t ON t.id = f.typeId \
                            INNER JOIN locations l ON l.id = f.locationId \
                         WHERE f.locationId = ? \
                         ORDER BY f.title'

            connection.query(query, locationId, function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, rows)
            })
        })
    }  

    this.getByType = function (typeId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            var query = 'SELECT f.id, f.title, f.typeId, f.locationId, t.name as typeName, l.name as locationName \
                         FROM films f \
                            INNER JOIN types t ON t.id = f.typeId \
                            INNER JOIN locations l ON l.id = f.locationId \
                         WHERE f.typeId = ? \
                         ORDER BY f.title'

            connection.query(query, typeId, function (err, rows) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, rows)
            })
        })
    }       

    this.updateFilm = function (id, title, remarks, typeId, locationId, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('UPDATE films SET title = ?, remarks = ?, typeId = ?, locationId = ? WHERE id = ?', [title, remarks, typeId, locationId, id], function (err, result) {
                connection.release();
                if (err) {
                    callback(err)
                    return 
                }

                callback(null, result.changedRows)
            })
        })
    }

    this.deleteFilm = function (id, callback) {
        database.getPool().getConnection(function (conErr, connection) {
            if (conErr) {
                callback(conErr)
                return
            }

            connection.query('DELETE FROM films WHERE id = ?', id, function (err, result) {
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

module.exports = FilmsDataAccess