"use strict";

module.exports = {
    forWeb: (url) => {
        return url.match(/^\/web\//);
    }
};
