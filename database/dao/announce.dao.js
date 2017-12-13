'use strict';

const announceModel = require('mongoose').model('Announce');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const utilRequest = require('../../lib/utilRequest');
const i18next = require('../../middlewares/middleware_i18n');

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


module.exports.findAllAnnounce = async(req, res, next)=>{
    let _msgReturn = '';
    let queryAllresult = announceModel.find();
    // URL have /web on path ?
    if( utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        if(queryAllresult){
            return res.render('announce', {
                success: true,
                announces: queryAllresult
            });
        }else{
            return res.render('announce', {
                success: false,
                announces: {}
            });
        }// end if queryAllresult
    }
    else if( !utilRequest.isRegisterWeb(req) && req.method === 'GET' ){
        if(queryAllresult){
            return res.render('announce', {
                success: true,
                announces: queryAllresult
            });
        }else{
            return res.render('announce', {
                success: false,
                announces: {}
            });
        }// end if queryAllresult
    }
    else if( utilRequest.isRegisterWeb(req) && req.method === 'POST' ) {
        if(queryAllresult){
            return res.status(200).json({
                success: true,
                announces: queryAllresult
            }); 
        }else{
            _msgReturn = req.t('NOT_FOUND_ANNOUNCES_IN_DB') || 'Not found announcements into db';
            return res.status().json({
                success: false,
                message: _msgReturn
            });
        }// end if queryAllresult
    }
    else{
        if(queryAllresult){
            return res.render('announce', {
                success: true,
                announces: queryAllresult
            });
        }else{
            return res.render('announce', {
                success: false,
                announces: {}
            });
        }// end if queryAllresult
    }// end if
};

module.exports.findByTagAnnounce = async(req, res, next)=>{
    let objFilter = null;
    objFilter = objParamsFilter.queryFields(req, res, next);

    let queryTag = Announce.find();

};

/*
module.exports.findByFilterUser = async(req, res, next)=>{
    
};

module.exports.findByFilterUser = async(req, res, next)=>{
    
};

module.exports.findByFilterUser = async(req, res, next)=>{
    
};

module.exports.findByFilterUser = async(req, res, next)=>{
    
};

module.exports.findByFilterUser = async(req, res, next)=>{
    
};

module.exports.findByFilterUser = async(req, res, next)=>{
    
};
*/