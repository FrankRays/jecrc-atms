module.exports = {
    index: (req, res) => {
        res.render('index.hbs');
    },
    error_403: (req, res) => {
        res.status(403).render('403.hbs');
    },
    error_404: (req, res) => {
        res.status(404).render('404.hbs');
    },
    error_500: (req, res) => {
        res.status(500).render('500.hbs');
    },
    login_page: (req, res) => {

        if (req.session.authenticated) {
            res.redirect('/web/dashboard');
        } else {
            res.render('login.hbs');
        }

    },
    dashboard: (req, res) => {
        res.send("Welcome dashboard");
    }
};
