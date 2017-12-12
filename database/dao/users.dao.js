'use strict';

const UserModel = require('../../models/user.model'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

module.exports.createUser = (req, res, next)=>{
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let password = req.body.password;
    let msgError = '';
    UserModel.find({email: email}).exec((err, user)=>{
        // Error yes.
        if(err){
            return res.json({
                success: false,
                error: err
            });
        }
        // User exist
        if(user){
            msgError = res.t('USER_EXIST') || 'Existing User';
            return res.status(403).json({ 
                success: false, 
                error: msgError
            });
        }else{ // All correct - create new user
            
            console.log('Saving new user : ', newUser.name, newUser.email);

        }

    });

};

module.exports.updateUser = (req, res, next)=>{
    
};

module.exports.deleteUser = (req, res, next)=>{
        
};

module.exports.findUserById = (req, res, next)=>{
    
};

module.exports.findAllUser = (req, res, next)=>{
    
};

module.exports.findByFilterUser = (req, res, next)=>{
    
};