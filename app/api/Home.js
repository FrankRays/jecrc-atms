"use strict";

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const server = require('../../server.js');
const locals = require('../../config/locals.js');
const input = require('../utils/input.js');

module.exports = {
    index: (req, res) => {

        res.json({
            success: true,
            data: {
                message: "Welcome"
            }
        });

    },
    error_403: (req, res) => {

        res.status(403).json({
            success: false,
            data: {
                message: "Access Denied!"
            }
        });

    },
    error_404: (req, res) => {

        res.status(404).json({
            success: false,
            data: {
                message: "Page not found"
            }
        });

    },
    error_500: (req, res) => {

        res.status(500).json({
            success: false,
            data: {
                message: "Internal server error"
            }
        });

    },
    signup: (req, res) => {

        let isValid = input.validate(req.body, {
            name: "isNotEmpty",
            mobile: "isMobilePhone",
            email: "isEmail",
            password: "isNotEmpty",
            type: "isAlpha"
        });

        if (isValid !== true) {

            res.json({
                success: false,
                data: {
                    message: "Invalid input: \"" + isValid + "\"."
                }
            });

        } else {

            req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex");
            server.pool.getConnection((err, connection) => {

                let query = "SELECT * FROM user WHERE ?";

                connection.query(query, {
                    email: req.body.email
                }, (error, results, fields) => {

                    if (error) {

                        console.error(error);
                        res.json({
                            success: false,
                            data: {
                                message: "Something went wrong!"
                            }
                        });

                    } else if (results.length) {

                        res.json({
                            success: false,
                            data: {
                                message: "User with this email exists!"
                            }
                        });

                    } else {

                        connection.query("INSERT INTO user \
                            (name, mobile, email, password, type, createdAt) \
                            VALUES(?, ?, ?, ?, ?, ?)", [
                            req.body.name,
                            req.body.mobile,
                            req.body.email,
                            req.body.password,
                            req.body.type,
                            new Date()
                        ], (err, results, fields) => {

                            connection.release();

                            if (err) {

                                console.error(err);
                                res.json({
                                    success: false,
                                    data: {
                                        message: "Something went wrong!"
                                    }
                                });

                            } else {

                                res.json({
                                    success: true,
                                    data: {
                                        message: "User created."
                                    }
                                });

                            }

                        });

                    }

                });

            });

        }

    },
    login: (req, res) => {

        let isValid = input.validate(req.body, {
            email: "isNotEmpty",
            password: "isNotEmpty"
        });

        if (isValid !== true) {

            res.json({
                success: false,
                data: {
                    message: "Invalid input: \"" + isValid + "\"."
                }
            });

        } else {

            req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex");
            server.pool.getConnection((err, connection) => {
                let query = "SELECT * FROM user WHERE email=? AND password=?";

                connection.query(query, [
                    req.body.email,
                    req.body.password
                ], (error, results, fields) => {

                    if (error) {

                        console.error(error);
                        res.json({
                            success: false,
                            data: {
                                message: "Something went wrong!"
                            }
                        });

                    } else if (results.length) {

                        let token = jwt.sign({
                            email: results[0].email,
                            name: results[0].name,
                            mobile: results[0].mobile,
                            type: results[0].type
                        }, locals.jwt.secret);

                        res.cookie('x-access-token', token);
                        req.session.authenticated = true;

                        res.json({
                            success: true,
                            data: {
                                message: "Successfully logged in.",
                                token: token
                            }
                        });

                    } else {

                        res.json({
                            success: false,
                            data: {
                                message: "Wrong credentials!"
                            }
                        });

                    }

                });

            });

        }

    },
    logout: (req, res) => {

        req.session.destroy(function(err) {

            res.clearCookie("x-access-token");

            res.json({
                success: true,
                data: {
                    message: "Successfully logged out."
                }
            });

        })

    }
};
