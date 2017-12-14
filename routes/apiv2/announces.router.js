'use strict';

const express = require('express'),
router = express.Router(),
app = express();

const announceController = require('../../controllers/announces.controller');
const API_VERSION = '/apiv2',
    API_OBJECT_NAME = '/announce';

module.exports = (app)=>{
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/tag/:name?/:limit?/:skip?/:select?`) // /apiv?/announce/tags
    .get(announceController.requiresLogin, announceController.listByQueryAnnounce)
    .post(announceController.requiresLogin, announceController.listByQueryAnnounce);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/:type/:web?`) // /apiv?/announce/type (sales or search)
    .get(announceController.requiresLogin)
    .post(announceController.requiresLogin);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/pricemin/:web?`) // /apiv?/announce/pricemin (price sort min)
    .get(announceController.requiresLogin)
    .post(announceController.requiresLogin);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/pricemax/:web?`) // /apiv?/announce/pricemax (price sort max)
    .get(announceController.requiresLogin)
    .post(announceController.requiresLogin);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/name/:web?`) // /apiv?/announce/name (announce sort name)
    .get(announceController.requiresLogin)
    .post(announceController.requiresLogin);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}/pricemin/:web?`) // /apiv?/announce
    .get(announceController.requiresLogin)
    .post(announceController.requiresLogin);
    
    app.route(`${API_VERSION}${API_OBJECT_NAME}`) // /apiv?/announce
    .get(announceController.requiresLogin, announceController.listAllAnnounce)
    .post(announceController.requiresLogin, announceController.listAllAnnounce);

};