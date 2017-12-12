'use strict';

module.exports.isApi = (request)=>{
    return request.originalUrl.indexOf('/apiv') === 0;
};

/**
 * 
 * @param {request for search path} request 
 */
module.exports.isRegisterWeb = (request)=>{
    let pattern = /\/web/gi;
    return pattern.exec(request.originalUrl);
};
