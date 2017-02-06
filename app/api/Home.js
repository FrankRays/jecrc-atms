"use strict";

const server = require('../../server.js');
const jwt = require('jsonwebtoken');
const locals = require('../../config/locals.js');
const crypto = require('crypto');

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

        let whiteSpaces = /^\s*$/,
            email = req.body.email,
            password = req.body.password,
            type = req.body.type;

        if (email.match(whiteSpaces) ||
            password.match(whiteSpaces) ||
            type.match(whiteSpaces)) {

            res.json({
                success: false,
                data: {
                    message: "Invalid input"
                }
            });

        } else {

            password = crypto.createHash('md5').update(password).digest("hex");
            server.pool.getConnection((err, connection) => {

                let query = "SELECT * FROM user WHERE ?";

                connection.query(query, {
                    email: email
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
                            (email, password, type, createdAt) \
                            VALUES(?, ?, ?, ?)", [
                            email,
                            password,
                            type,
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

        let whiteSpaces = /^\s*$/,
            email = req.body.email || "",
            password = req.body.password || "";

        if (email.match(whiteSpaces) ||
            password.match(whiteSpaces)) {

            res.json({
                success: false,
                data: {
                    message: "Invalid input"
                }
            });

        } else {

            password = crypto.createHash('md5').update(password).digest("hex");
            server.pool.getConnection((err, connection) => {
                let query = "SELECT * FROM user WHERE email=? AND password=?";

                connection.query(query, [
                    email,
                    password
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
                            type: results[0].type,
                            athenticated: true
                        }, locals.jwt.secret);

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

    }
};
