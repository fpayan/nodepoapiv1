'use strict';

let jwt = require('jsonwebtoken');
let crypto = require('crypto');
let mongoose = require('mongoose');

let express = require('express');
let router = express.Router();

let User = require('../models/user.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Authenticate User
router.post('/authenticate', function(req, res) {
    let user = req.body.email;
    let pass = crypto.createHash('sha256').update(req.body.password).digest('hex');
    let lang = req.query.lang || req.params.lang || req.get('Accept-Language') || 'es';

    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }

    let errorText;

    User.findOne({email: user}).exec(function(err, user) {
        if (err) {
            return res.status(500).json({ success: false, error: err});
        }

        if (!user) {
            errorText = errorTranslator('USER_NOT_FOUND', langError);
            return res.status(401).json({ success: false, error: errorText});
        }

        if (user.password !== pass) {
            errorText = errorTranslator('INVALID_PASS', langError);
            return res.status(401).json({ success: false, error: errorText});
        }

        let token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '2 days'
        });
        res.json({success: true, token: token});

    });
});

//Register new User
router.post('/register', function(req, res) {
    let nombre = req.body.nombre;
    let user = req.body.email;
    let password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    let lang = req.query.lang;

    let langError;
    if (lang === 'es') {
        langError = lang;
    } else {
        langError = 'en';
    }

    let errorText;

    // First, we check if the user with email request exist in the DB to not create a duplicate one
    User.findOne({email: user}).exec(function(err, user) {
        if (err) {
            return res.status(500).json({ success: false, error: err});
        }

        if (user) {
            errorText = errorTranslator('USER_EXIST', langError);
            return res.status(403).json({ success: false, error: errorText});
        } else {
            let email = req.body.email;
            let newUser = new User({
                nombre: nombre,
                email: email,
                password: password
            });

            console.log('Saving User: ' + newUser.nombre, ' ...');
            newUser.save(function(error, UserCreado) {
                if (error) {
                    return res.status(500).json({ success: false, error: err});
                }

                console.log('OK');
                res.status(200).json({success: true, newUser: UserCreado });
            });
        }
    });
});

module.exports = router;

