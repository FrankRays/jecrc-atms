"use strict";

const validator = require('validator');

module.exports = {

    validate: (data, options) => {

        // check for all keys mentioned in "options" exists in "data".
        for (var key in options) {

            if (!(options.hasOwnProperty(key) && data.hasOwnProperty(key))) {
                return key;
            }

        }

        // validate all feilds in "data"
        for (var input in data) {

            if (data.hasOwnProperty(input) && (input in options)) {

                switch (options[input]) {
                    case "isNotEmpty":
                        if (data[input].match(/^\s*$/)) {
                            return input;
                        }
                        break;
                    case "isEmpty":
                        if (!data[input].match(/^\s*$/)) {
                            return input;
                        }
                        break;
                    case "isEmail":
                        if (!validator.isEmail(data[input])) {
                            return input;
                        }
                        break;
                    case "isAlphanumeric":
                        if (!validator.isAlphanumeric(data[input])) {
                            return input;
                        }
                        break;
                    case "isAlpha":
                        if (!validator.isAlpha(data[input])) {
                            return input;
                        }
                        break;
                    case "isMobilePhone":
                        if (!validator.isMobilePhone(data[input], "en-IN")) {
                            return input;
                        }
                        break;
                    case "isNumeric":
                        if (!validator.isNumeric(data[input])) {
                            return input;
                        }
                        break;
                    default:
                        return true;
                }

            }

        }

        return true;

    }

};
