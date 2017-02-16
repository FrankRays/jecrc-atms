module.exports = {
    index: (req, res) => {
        res.render('index.hbs', {
            layout: false
        });
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
            session: req.session,
            jwt: req.jwtDecoded
        });

    },
    dashboard: (req, res) => {

        res.render("dashboard", {
            session: req.session,
            jwt: req.jwtDecoded
        });

    }
};
