/*******************************************************************************
 * Routes.js
 *******************************************************************************
 *
 * The controllers are in the directory:
 * 1. /app/api/
 * 2. /app/common/
 * 3. /app/web/
 *
 * There are three type of routing:
 * 1. For API
 * 2. For Website
 * 3. For Both
 *
 * The endpoint you mention will be as follows:
 *
 * "METHOD URL" : "Controller_Name.Function_Name"
 *
 * here METHOD will be: {"GET", "POST", "PUT", "DELETE"}
 * and so on as mentioned in express.js documentation for routing methods.
 *
 * The URL will automatically be prepended by the type of routing. For example:
 * api: {
 *     "GET /home/books": "Home.index"
 * }
 * above will be converted to url: /api/home/books
 */

module.exports = {
    api: {
        // all api routes
        "GET /": "Home.index",
        "GET /404": "Home.error_404",
        "GET /500": "Home.error_500"
    },
    web: {
        // all website routes
        "GET /": "Home.index",
        "GET /404": "Home.error_404",
        "GET /500": "Home.error_500",
        "GET /login-page": "Home.login_page"
    },
    common: {
        // all routes common for both web & api
        "GET /": "Home.index"
    }
};
