"use strict";
const server = require('../../server.js');

module.exports = {
    index: (req, res) => {
        res.json({
            success: true,
            data: "Welcome"
        });
    },
    error_404: (req, res) => {
        res.status(404).json({
            success: false,
            data: "Page not found"
        });
    },
    error_500: (req, res) => {
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};
