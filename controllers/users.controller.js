'use strict';

const jwt = require('jsonwebtoken'),
    userModel = require('../models/user.model'),
    daoUser = require('../database/dao/users.dao'), 
    utilRequest = require('../lib/utilRequest'),
    i18next = require('../middlewares/middleware_i18n');

/**
 * Regiter user from web or api version.
 * 
 * URL valid:
 * /apiv2/register/web - HTML
 * /apiv2/register - API
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.register = (req, res, next)=>{
    console.log('Method :', req.method);
    // URL have /web on path ?
    if(utilRequest.isRegisterWeb(req) && req.method === 'GET'){
        // Yes it's! - response format HTML
        res.render('index', {title: "Register for user", msg: "Register for user"});
    }
    else if(!utilRequest.isRegisterWeb(req) && req.method === 'GET'){
        res.render('index', {title: "Register for user", msg: "Register for user"});
    }
    else if(!utilRequest.isRegisterWeb(req) && req.method === 'POST'){
        // User want register into system from API method.
        daoUser.createUser(req, res, next);
        res.json({
            success: true,
            msg: "Te estas registrando desde api method !"
        });
    }
    else{
        res.render('index', {title: "Register for user", msg: "Register for user"});
    }
};

/**
 * Login user from web or api version.
 * 
 * URL valid:
 * /apiv2/register/web - HTML
 * /apiv2/register - API
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.login = (req, res, next)=>{
    // URL have /web on path ?
    if(utilRequest.isRegisterWeb(req)){
        // Yes it's! - response format HTML
        res.render('index', {title: "Login for user", msg: "Login for user"});
    }else{
        // No itn't - response format JSON
        res.json({
            success: true,
            msg: "Te estas logeando desde api method !"
        });
    }
    
};

/**
 * Logout user from web or api version.
 * 
 * URL valid:
 * /apiv2/register/web - HTML
 * /apiv2/register - API
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.logout = (req, res, next)=>{
    // URL have /web on path ?
    if(utilRequest.isRegisterWeb(req)){
        // Yes it's! - response format HTML
        res.render('index', {title: "Logout", msg: "Logout de user"});
    }else{
        // No itn't - response format JSON
        res.json({
            success: true,
            msg: "Estas saliendo desde api method !"
        });
    }
};


module.exports.requiresLogin = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.get('x-access-token');
    let msgError = '';
    if (token) {
    // verifies secret and checks credential
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) { //failed verification.
                msgError = req.t('FAILED_AUTH') || 'Invalid token';
                if(utilRequest.isApi(req)){ // If is API call, return object to JSON.
                    return res.json({
                        "success": false,
                        "message": msgError
                    });
                }else{ // Return <html>.
                    const error = new Error(msgError);
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
            msgError = req.t('NO_TOKEN') || 'No token provided';
            return res.status(401).json({
                "error": true,
                message: msgError,
                status: 401
            });
        }else{
            const err = new Error(msgError);
            err.status = 401;
            next(err);
            return;
        }// end secound if - utilRequest.
    } // end if - token
};// end requiresLogin function.


module.exports.hasAuthorization = (req, res, next)=>{

};
