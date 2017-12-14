'use strict';

const jwt = require('jsonwebtoken');
const announceModel = require('mongoose').model('Announce');
const utilRequest = require('../lib/utilRequest');
const i18next = require('../middlewares/middleware_i18n');
const daoAnnounce = require('../database/dao/announce.dao');

// Return query format req.query or req.params
const objParamsFilter = {
    queryFields: async (req, res, next)=> {
        return {
            _filter : req.query.filter || req.params.filter || req.body.filter,
            _limit : req.query.limit || req.params.limit || req.body.limit,
            _skip : req.query.skip || req.params.skip || req.body.skip,
            _sort : req.query.sort || req.params.sort || req.body.sort,
            _fields : req.query.fields || req.params.fields || req.body.fields,
        }
    }
};

/**
 * List all record for doc Announce
 * 
 * Call method dao of Announce and get all announces in doc.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.listAllAnnounce = (req, res, next)=>{
    daoAnnounce.findAllAnnounce(req, res, next, null, null, null, null);    
};

module.exports.listByQueryAnnounce = (req, res, next)=>{
    let queryAnnounce = objParamsFilter.queryFields(req, res, next);
    daoAnnounce.findByQueryAnnounce(req, res, next, queryAnnounce._filter, queryAnnounce._limint, queryAnnounce._skip, queryAnnounce._sort, queryAnnounce._fields);
};

module.exports.createAnnounce = (req, res, next)=>{
    daoAnnounce.createAnnounce(req, res, next);
};


module.exports.updateAnnounce = (req, res, next)=>{
    
};

module.exports.deleteAnnounce = (req, res, next)=>{
    
};

module.exports.requiresLogin =async (req, res, next)=>{
    const token = req.body.token || req.query.token || req.get('x-access-token');
    let _msgError = '';
    if (token) {
    // verifies secret and checks credential
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) { //failed verification.
                _msgError = req.t('FAILED_AUTH') || 'Invalid token';
                if(utilRequest.isApi(req)){ // If is API call, return object to JSON.
                    return res.json({
                        "success": false,
                        "message": _msgError
                    });
                }else{ // Return <html>.
                    const error = new Error(_msgError);
                    error.status = 401;
                    next(error);
                    return;
                } // end secound if - utilRequest.
            }// end error verifies
            req.userId = decoded.user_id; // lo guardamos en el request para los siguientes middlewares
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        if(utilRequest.isApi(req)){
            _msgError = req.t('NO_TOKEN') || 'No token provided';
            return res.status(401).json({
                success: false,
                message: _msgError
            });
        }else{
            const err = new Error(_msgError);
            err.status = 401;
            next(err);
            return;
        }// end secound if - utilRequest.
    } // end if - token
};// end requiresLogin function.
