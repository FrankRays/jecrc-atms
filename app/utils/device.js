"use strict";

module.exports = {
    isWeb: (url) => {
        return url.match(/^\/web\//);
    }
};
