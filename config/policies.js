/*******************************************************************************
 * Ploicies.js
 *******************************************************************************
 *
 * The policies are in the directory: /app/policies/
 * All policies can have only one function named "index".
 *
 * There are three type of policies:
 * 1. For all controllers
 * 2. For all handlers
 * 3. For specific handler
 *
 * For all Controller/Handler, use asterisk symbol(*) as follows:
 *
 *  "*" : "PolicyName"
 *  OR
 *  "*" : ["PolicyName1", "PolicyName2"] // policies will be executed in order
 *
 *
 * The endpoint you mention will be as follows:
 *
 * "Controller/Handler Name" : "PolicyName"
 * OR
 * "Controller/Handler Name" : ["PolicyName1", "PolicyName2"]
 *
 * If in place of PolicyName true/false is used then that Controller/Handler
 * will be Allowed/Blocked to execute.
 *
 * If "*" as well as "Controller/Handler" is not mentioned then by default that
 * Controller/Handler will be allowed to execute.
 *
 * Following will be structure:
 *
 * {
 *      "api": {
 *          "*" : PolicyName,
 *          "Controller_1": PolicyName,
 *          "Controller_2": {
 *              "*": PolicyName,
 *              "Handler_1": PolicyName,
 *              "Handler_2": PolicyName
 *          }
 *      },
 *      "web": {
 *          "*" : PolicyName,
 *          "Controller_1": PolicyName,
 *          "Controller_2": {
 *              "*": PolicyName,
 *              "Handler_1": PolicyName,
 *              "Handler_2": PolicyName
 *          }
 *      }
 * }
 *******************************************************************************/

"use strict";

module.exports = {
    "api": {
        "*": "Auth",
        "Home": {
            "*": "Auth",
            "error_403": true,
            "error_404": true,
            "error_500": true,
            "login": true,
            "logout": true,
            "signup": ["Auth", "Permission"]
        }
    },
    "web": {
        "*": "Auth",
        "Home": {
            "*": "Auth",
            "error_403": true,
            "error_404": true,
            "error_500": true,
            "login_page": true,
            "logout": true
        }
    }
};
