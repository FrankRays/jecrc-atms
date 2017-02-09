/*******************************************************************************
 * Auth.js
 *******************************************************************************
 *
 * A middleware to check whether data sent from client is not modified and user
 * is authorized or not.
 *
 ******************************************************************************/

"use strict";

const jwt = require('jsonwebtoken');
const url = require('../utils/Url.js');
const locals = require('../../config/locals.js');

module.exports = {
    index: (req, res, next) => {

        // check header or url parameters or post parameters for token
        let token = req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies['x-access-token'];

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, locals.jwt.secret, function(err, jwtDecoded) {
                if (err) {
                    return res.json({
                        success: false,
                        data: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.jwtDecoded = jwtDecoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            if (url.forWeb(req.path)) {
                res.redirect('/web/login-page');
            } else {
                return res.redirect('/api/403');
            }

        }
    }
};
