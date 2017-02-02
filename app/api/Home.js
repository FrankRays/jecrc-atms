"use strict";

const server = require('../../server.js');
const jwt = require('jsonwebtoken');
const locals = require('../../config/locals.js');
const crypto = require('crypto');

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
                data: "Invalid input"
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
                            data: "Something went wrong!"
                        });

                    } else if (results.length) {

                        res.json({
                            success: false,
                            data: "User with this email exists!"
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
                                    data: "Something went wrong!"
                                });
                            } else {
                                res.json({
                                    success: true,
                                    data: "User created."
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
        console.log(email, password);
        if (email.match(whiteSpaces) ||
            password.match(whiteSpaces)) {

            res.json({
                success: false,
                data: "Invalid input"
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
                            data: "Something went wrong!"
                        });

                    } else if (results.length) {

                        let token = jwt.sign({
                            email: results[0].email,
                            type: results[0].type
                        }, locals.jwt.secret);

                        res.json({
                            success: true,
                            data: token
                        });

                    } else {
                        res.json({
                            success: false,
                            data: "Wrong credentials!"
                        });
                    }
                });
            });
        }
    }
};
