'use strict';

const jwt = require('jsonwebtoken');
const announceModel = require('mongoose').model('Announce');
const utilRequest = require('../lib/utilRequest');
const i18next = require('../middlewares/middleware_i18n');
const daoAnnounce = require('../database/dao/announce.dao');



module.exports.listAllAnnounce = (req, res, next)=>{
    daoAnnounce.findAllAnnounce(req, res, next);    
};

module.exports.listByIdAnnounce = (req, res, next)=>{
    
};

module.exports.filterAnnounce = (req, res, next)=>{
    
};

module.exports.filterByTagAnnounce = (req, res, next)=>{
    let searchTag = req.query.tag || req.params.tag;
    return res.json({
        success: true,
        message: 'Filter TAG'
    });
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
