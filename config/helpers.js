"use strict";

module.exports = {

    condition: (v1, operator, v2, options) => {

        switch (operator) {
            case '==':

                return (v1 == v2);
                break;

            case '!=':

                return (v1 != v2);
                break;

            case '||':

                return (v1 || v2);
                break;

            case '&&':

                return (v1 && v2);
                break;

            default:
                return false;
        }

    }

};
