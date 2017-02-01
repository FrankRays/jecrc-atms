/*******************************************************************************
 * Permission.js
 *******************************************************************************
 *
 * A middleware to check whether client is authorized to take the action
 * attached to the endpoint.
 *
 */

"use strict";

module.exports = {
    index: (req, res, next) => {
        let userType = req.jwtDecoded.type;

        if (userType == "admin") {
            next();
        } else {
            res.status(403).json({
                success: false,
                data: "Access denied."
            });
        }
    }
};
