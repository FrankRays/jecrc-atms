"use strict";

const express = require('express');
const app = express();

const session = require('express-session');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

const config = {
    locals: require('./config/locals.js'),
    routes: require('./config/routes.js'),
    policies: require('./config/policies.js')
};

const url = require('./app/utils/Url.js');

const server = app.listen(config.locals.port, () => {
    console.log(
        "Server started!! Please visit:",
        '\x1b[36m',
        "http://localhost:" + config.locals.port,
        '\x1b[0m'
    );
});

const pool = mysql.createPool(config.locals.mysql);

// exports
module.exports = {
    pool: pool
};

// setup view engine
app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

// public files
app.use(express.static('public'));

// session
app.use(session({
    secret: config.locals.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

// cookie-parser
app.use(cookieParser());

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// register policies
let registerPolicies = (policyName, method, endpoint) => {

    if (policyName instanceof Array) {

        for (var i = 0; i < policyName.length; i++) {

            let policy = require('./app/policies/' + policyName[i] + '.js');
            app[method](endpoint, policy.index);

        }

    } else if (policyName === true) {

        app[method](endpoint, (req, res, next) => next());

    } else if (policyName === false) {

        app[method](endpoint, (req, res, next) => {

            if (url.forWeb(endpoint)) {
                res.redirect('/web/403');
            } else {
                res.redirect('/api/403');
            }

        });

    } else {

        let policy = require('./app/policies/' + policyName + '.js');
        app[method](endpoint, policy.index);

    }

}

let addPolicy = (option, endpoint, method, controller, handler) => {

    if (config.policies[option].hasOwnProperty(controller)) {

        if (config.policies[option][controller].hasOwnProperty(handler)) {

            let policyName = config.policies[option][controller][handler];
            registerPolicies(policyName, method, endpoint);

        } else if ((config.policies[option][controller] instanceof Array) ||
            !(config.policies[option][controller] instanceof Object)) {

            let policyName = config.policies[option][controller];
            registerPolicies(policyName, method, endpoint);

        } else if (config.policies[option][controller].hasOwnProperty("*")) {

            let policyName = config.policies[option][controller]["*"];
            registerPolicies(policyName, method, endpoint);

        }

    } else if (config.policies[option].hasOwnProperty("*")) {

        let policyName = config.policies[option]["*"];
        registerPolicies(policyName, method, endpoint);

    }

};

// register endpoints for api
let registerEndpoints = (option) => {

    for (let key in config.routes[option]) {

        if (config.routes[option].hasOwnProperty(key)) {

            let controllerName = config.routes[option][key]
                .substr(0, config.routes[option][key].indexOf('.')),

                handler = config.routes[option][key]
                .substr(config.routes[option][key].indexOf('.') + 1),

                method = key.substr(0, key.indexOf(' ')).toLowerCase(),
                route = key.substr(key.indexOf(' ') + 1);

            try {

                let controller = require('./app/' +
                        option + '/' + controllerName + '.js'),
                    endpoint = '/' + option + route;

                addPolicy(option, endpoint, method, controllerName, handler);
                app[method](endpoint, controller[handler]);

            } catch (e) {
                console.error(e);
            }

        }

    }

}

registerEndpoints('api');
registerEndpoints('web');

app.get('/', function(req, res) {
    res.redirect('/web/');
});
