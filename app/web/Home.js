"use strict";

const ApiData = require('../utils/ApiData.js');

module.exports = {
    index: (req, res) => {

        res.redirect('/web/login-page');
        // res.render('index.hbs', {
        //     layout: false
        // });

    },
    error_403: (req, res) => {

        res.status(403).render('403.hbs', {
            layout: false
        });

    },
    error_404: (req, res) => {

        res.status(404).render('404.hbs', {
            layout: false
        });

    },
    error_500: (req, res) => {

        res.status(500).render('500.hbs', {
            layout: false
        });

    },
    login_page: (req, res) => {

        if (req.session.authenticated) {
            res.redirect('/web/dashboard');
        } else {
            res.render('login.hbs', {
                layout: false
            });
        }

    },
    logout: (req, res) => {

        req.session.destroy(function(err) {

            res.clearCookie("x-access-token");
            res.redirect('/web/login-page');

        })

    },
    signup: (req, res) => {

        res.render("signup", {
            title: "Signup",
            session: req.session,
            jwt: req.jwtDecoded
        });

    },
    profile: (req, res) => {

        ApiData.profile(req.jwtDecoded.userId, (err, results) => {

            let resData = {
                title: "Profile",
                session: req.session,
                jwt: req.jwtDecoded
            };

            if (err) {

                console.error(err);
                resData.error = "Error in fetching profile data.";

            } else {

                resData.profileData = results[0];

            }

            res.render("profile", resData);

        });

    },
    dashboard: (req, res) => {

        res.render("dashboard", {
            title: "Dashboard",
            session: req.session,
            jwt: req.jwtDecoded
        });

    }
};
