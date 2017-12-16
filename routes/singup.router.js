'use strict';

const express = require('express'),
    router = express.Router(),
    app = express();
    
const singupController = require('../controllers/main.controller');

module.exports = (app)=>{
    app.route(`/singup`)
    .get(singupController.singup)
    .post(singupController.singup);
};