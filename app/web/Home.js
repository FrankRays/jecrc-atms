module.exports = {
    index: (req, res) => {
        res.render('index.hbs');
    },
    error_404: (req, res) => {
        res.status(404).render('404.hbs');
    },
    error_500: (req, res) => {
        res.status(500).render('500.hbs');
    }
};
