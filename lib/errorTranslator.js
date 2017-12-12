'use strict';

let fs = require('fs');

let errorContent = fs.readFileSync('./lang/errors.json');

let errorJson = JSON.parse(errorContent);

function errorTranslator(key, langError) {
    if (langError === 'es') {
        return errorJson[key].es;
    } else {
        return errorJson[key].en;
    }

}

module.exports = errorTranslator;