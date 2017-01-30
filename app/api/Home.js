"use strict";
const server = require('../../server.js');

module.exports = {
    index: (req, res) => {
        res.json({
            success: true,
            data: "Welcome"
        });
    }
};
