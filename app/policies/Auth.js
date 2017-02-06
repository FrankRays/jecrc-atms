/*******************************************************************************
 * Auth.js
 *******************************************************************************
 *
 * A middleware to check whether data sent from client is not modified and user
 * is authorized or not.
 *
 * This policy apply to all endpoints for exceptions, add the url to
 * "nonProtected" array object.
 *
 ******************************************************************************/

"use strict";

const jwt = require('jsonwebtoken');
const device = require('../utils/device.js');
const locals = require('../../config/locals.js');

let nonProtected = [
    "/",

    "/web/",
    "/web/403",
    "/web/404",
    "/web/500",
    "/web/login-page",

    "/api/",
    "/api/403",
    "/api/404",
    "/api/500",
    "/api/login",
];

module.exports = {
    index: (req, res, next) => {

        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (nonProtected.indexOf(req.path) != -1) {
            next();
        } else if (token) {

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
                    console.log(jwtDecoded);
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            if (device.isWeb(req.path)) {
                res.redirect('/web/403');
            } else {
                return res.redirect('/api/403');
            }

        }
    }
};
