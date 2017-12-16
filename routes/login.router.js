'use strict';

const express = require('express'),
    router = express.Router(),
    app = express();
const loginController = require('../controllers/users.controller');

module.exports = (app)=>{
    app.route(`/login`)
    .get(loginController.login)
    .post(loginController.login);
};