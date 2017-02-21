/*******************************************************************************
 * ApiData.js
 *******************************************************************************
 *
 * A utility for all common data to be fetched in API as well as WEB.
 *
 *******************************************************************************/

"use strict";

const server = require('../../server.js');

module.exports = {

    profile: (userId, cb) => {

        server.pool.getConnection((err, connection) => {

            let query = "SELECT * FROM user \
            LEFT JOIN student ON student.userId=user.id \
            LEFT JOIN faculty ON faculty.userId=user.id \
            WHERE user.id=?";

            connection.query(query, [userId], (err, results, fields) => {

                connection.release();
                cb(err, results);

            });

        });

    }

};
