'use strict';

const UserModel = require('mongoose').model('User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');

/**@module dao/user */

module.exports.createUser = async(req, res, next)=>{
    let _name = req.body.name;
    let _email = req.body.email;
    let _age = req.body.age;
    let _password = req.body.password;
    let _msgError = '';
    UserModel.findOne({email: _email}).exec((err, user)=>{
        // Error yes.
        if(err){
            return res.json({
                success: false,
                error: err
            });
        }
        // User exist
        if(user){
            _msgError = req.t('USER_EXIST') || 'Existing User';
            return res.status(403).json({ 
                success: false, 
                error: _msgError
            });
        }else{ // All correct - create new user
            /*
                name: 
                age: 
                email: 
                password: 
                announces:
                role: 
                created: 
                update: 
            */
            let _dateCreate = moment(new Date()).format();
            let _passHash = crypto.createHash('sha256').update(_password).digest('hex');
            console.log('HASH: ', _passHash);
            let _newUser = new UserModel({
                name: _name,
                age: _age,
                email: _email,
                password: _passHash,
                role: 'Client',
                created: _dateCreate,
                update: _dateCreate
            });
            console.log('Saving new user : ', _newUser.name, _newUser.email);
            _newUser.save((err, newUserCreated)=>{
                if(err){
                    res.status(500).json({ success: false, error: err});
                }
                console.log('OK save user');
                res.status(200).json({success: true, newUser: _newUser });
            });
        }
    });

};

/**@module dao/user */
module.exports.updateUser = async(req, res, next)=>{
    
};

/**@module dao/user */
module.exports.deleteUser = async(req, res, next)=>{
        
};

/**@module dao/user */
module.exports.findUserToAutentication = async(req, res, next)=>{
    let _email = req.body.email;
    let _pass = req.body.password;
    let _passHash = '';
    let _msgError = '';
    UserModel.findOne({email: _email}).exec((err, userCheck)=>{
        // Error yes.
        if(err){
            return res.json({
                success: false,
                error: err
            });
        }
        // user not found
        if( !userCheck ){
            _msgError = req.t('USER_NOT_FOUND') || 'User not found';
            return res.status(401).json({ 
                success: false, 
                error: _msgError
            });
        }
        // user whether exist ! Check password
        _passHash = crypto.createHash('sha256').update(_pass).digest('hex'); 
        if( userCheck.password === _passHash ){
            // User and password OK
            let token = jwt.sign({
                id: userCheck._id
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            // Send response with token.
            res.status(200).json({
                success: true,
                token: token
            });
        }else{
            // No password coincidente
            _msgError = req.t('INVALID_PASS') || 'Invalid Password';
            return res.status(401).json({ 
                success: false, 
                error: _msgError
            });
        }
    });// end findOne
};

/**@module dao/user */
module.exports.findUserById = async(req, res, next)=>{
    
};

/**@module dao/user */
module.exports.findAllUser = async(req, res, next)=>{
    
};

/**@module dao/user */
module.exports.findByFilterUser = async(req, res, next)=>{
    
};