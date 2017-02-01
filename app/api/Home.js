"use strict";

const server = require('../../server.js');
const jwt = require('jsonwebtoken');
const locals = require('../../config/locals.js');

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
    },
    login: (req, res) => {
        let token = jwt.sign('user-data', locals.jwt.secret);
        res.json({
            success: true,
            data: token
        });
    }
};
