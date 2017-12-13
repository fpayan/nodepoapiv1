'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('mongoose').model('User');
const daoUser = require('../database/dao/users.dao'); 
const utilRequest = require('../lib/utilRequest');

/**
 * Regiter user from web - <HTML> or api - JSON version.
 * 
 * URL valid:
 * /apiv2/user/register/web - HTML method GET or POST
 * /apiv2/user/register - API HTML method POST
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
        return daoUser.createUser(req, res, next);
    }
    else{
        res.render('index', {title: "Register for user", msg: "Register for user"});
    }
};

/**
 * Login user from web or api version.
 * 
 * URL valid:
 * /apiv2/user/register/web - HTML method GET or POST
 * /apiv2/user/register - API  method POST
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.login = async (req, res, next)=>{
    // URL have /web on path ?
    if( utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        // Yes it's! - response format HTML
        res.render('login', {title: "Login for user", msg: "Login for user"});
    }
    else if( !utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        res.render('login', {title: "Login for user", msg: "Login for user"});
    }
    else if( !utilRequest.isRegisterWeb(req) && req.method === 'POST' ){
        // response status 401 success: false or status 200 success: true
        daoUser.findUserToAutentication(req, res, next);
    }
    else{
        res.render('login', {title: "Login for user", msg: "Login for user"});
    }
    
};

/**
 * Logout user from web or api version.
 * 
 * URL valid:
 * /apiv2/user/register/web - HTML method GET or POST
 * /apiv2/user/register - API HTML method POST
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.logout =async (req, res, next)=>{
    let _msgToken = '';
    // URL have /web on path ?
    if( utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        // Yes it's! - response format HTML
        res.render('index', {title: "Logout for user", msg: "Logout for user"});
    }
    else if( !utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        res.render('index', {title: "Logout for user", msg: "Logout for user"});
    }
    else if( !utilRequest.isRegisterWeb(req) && req.method === 'POST' ){
        // response status 200 success: false (token not match) or status 200 success: true
        _msgToken = req.t('TOKEN_DELETED') || 'Token has deleted';
        if(req.body.token){
            return res.status(200).json({
                success: true,
                token: null,
                message: _msgToken
            });
        }
        return res.status(200).json({
            success: false,
            token: null,
            message: _msgToken
        });
    }
    else{
        res.render('index', {title: "Logout for user", msg: "Logout for user"});
    }
};

let userAuthenticate = async (_emailCheck, _passCheck)=>{

}


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


module.exports.hasAuthorization = async(req, res, next)=>{

};
