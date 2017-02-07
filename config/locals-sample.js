module.exports = {
    port: process.env.PORT || 3000,
    sessionSecret: "",
    mysql: {
        debug: true,
        connectionLimit: 10,
        host: '',
        user: '',
        password: '',
        database: ''
    },
    jwt: {
        secret: "",
        expiresInMinutes: 1440
    }
};
