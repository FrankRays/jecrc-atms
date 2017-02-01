/*******************************************************************************
 * Ploicies.js
 *******************************************************************************
 *
 * The policies are in the directory: /app/policies/
 * All policies can have only one function named "index".
 *
 * There are two type of policies:
 * 1. For all endpoints
 * 2. For specific endpoint
 *
 * For all endpoints, use asterisk symbol(*) in place of endpoint as follows:
 *
 *  "*" : "PolicyName"
 *
 * The endpoint you mention will be as follows:
 *
 * "METHOD URL" : "PolicyName"
 *
 * here METHOD will be: {"GET", "POST", "PUT", "DELETE"}
 * and so on as mentioned in express.js documentation for routing methods.
 */

module.exports = {
    '*': 'Auth',
    'POST /api/create-user': "Permission"
};
