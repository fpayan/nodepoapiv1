'use strict';

const announceModel = require('mongoose').model('Announce');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const utilRequest = require('../../lib/utilRequest');
const i18next = require('../../middlewares/middleware_i18n');




module.exports.findAllAnnounce = async(req, res, next, _limit, _skip, _sort, _fields)=>{
    //console.log('USER ID :', req.user_id );
    let _messageRes = req.t('NOT_FOUND_ANNOUNCES_IN_DB') || 'Not found announcements into db';
    announceModel.find()
    .limit(_limit)
    .skip(_skip)
    .sort(_sort)
    .select(_fields)
    .exec((err, announce)=>{
        if(err){
            res.format({
                html:()=>{
                    return res.status(406).render('announce', {
                        success: false,
                        message: err.message
                    });
                },
                json:()=>{
                    return res.status(406).json({
                        success: false,
                        message: err.message
                    });
                }
            });
        }
        // Yes, there are announces !!
        if(announce){
            res.format({
                html: ()=>{ // Send HTML data
                    return res.render('announce', {
                        success: true,
                        announces: announce
                    });
                }, // => HTML
                json: ()=>{ // Send JSON data
                    return res.status(200).json({
                        success: true,
                        announces: announce
                    });
                } // => JSON
            });
        }else{ // Don't find's announce. [ announce = null || undefined ]
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: false,
                        announces: {},
                        message: _messageRes
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(200).json({
                        success: false,
                        message: _messageRes
                    });
                }// => JSON
            });
        }; // end if(announce)
    });// end announceModel.find().exec
};

module.exports.findByQueryAnnounce = async(req, res, next, _filter, _limit, _skip, _sort, _fields)=>{
    //console.log('USER ID :', req.user_id );
    let _messageRes = req.t('NOT_FOUND_ANNOUNCES_IN_DB') || 'Not found announcements into db';
    announceModel.find(_filter) // {tag: "myTag"}
    .limit(_limit) // Number
    .skip(_skip) // Number
    .sort(_sort) // { { name: -1 } }
    .select(_fields) // { { name: 1, userID: 1 } }
    .exec((err, announce)=>{
        announce.name = {name: "Francisco"};
        if(err){
            res.format({
                html: ()=>{
                    return res.status(406).render('announce', {
                        success: false,
                        message: err.message
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(406).json({
                        success: false,
                        message: err.message
                    });
                } // => JSON
            });
        }
        //
        if(!Object.keys(announce).length){ // Don't find's announce. [ announce = null || undefined ]
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: false,
                        announces: {},
                        message: _messageRes
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(200).json({
                        success: false,
                        message: _messageRes
                    });
                } // => JSON
            });
        }
        // Yes, There are announces !!
        else{
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: true,
                        announces: announce
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(200).json({
                        success: true,
                        announces: announce
                    });
                } // => JSON   
            });
        }
    });

};

module.exports.createAnnounce = async(req, res, next)=>{
    let _newAnnounce = {
        nameArticle: req.query.name || req.params.name || req.body.name,
        textArticle: req.query.text || req.params.text || req.body.text, 
        price: req.query.price || req.params.price || req.body.price,
        salesAnnounce: req.query.sales || req.params.sales || req.body.sales,
        urlImage: req.query.imgurl || req.params.imgurl || req.body.imgurl,
        tags: req.query.tag || req.params.tag || req.body.tag,
        idUserOwn: req.query.user_id || req.params.user_id || req.body.user_id,
        created: new Date(),
        update: new Date()
    };
    // If Not exist user_id for reference doc User return 
    if(!_newAnnounce.idUserOwn){
        let _msgError = req.t('USER_NOT_FOUND_ID') || 'User id not found in request';
        res.format({
            html: ()=>{
                return res.status(401).render('announce', {
                    success: false,
                    message: _msgError
                });
            }, // => HTML
            json: ()=>{
                return res.status(401).json({
                    success: false,
                    message: _msgError
                });
            } // => JSON
        });
    }
    //
    //let announceSave = announceModel.save(_newAnnounce);
    announceModel.create([ _newAnnounce],( err, announce )=>{
        if(err){
            res.format({
                html: ()=>{
                    return res.status(406).render('announce', {
                        success: false,
                        message: err.message
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(406).json({
                        success: false,
                        message: err.message
                    });
                } // => JSON
            });
        }
        //
        if(announce){
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: true,
                        message: req.t('ANNOUNCE_SAVED') || 'Announce saved correct !'
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(200).json({
                        success: true,
                        message: req.t('ANNOUNCE_SAVED') || 'Announce saved correct !'
                    });
                } // => JSON
            });
        }else{
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: false,
                        message: req.t('ANNOUNCE_SAVED_ERROR') || 'Announce not saved'
                    });
                }, // => HTML
                json: ()=>{
                    return res.json({
                        success: false,
                        message: req.t('ANNOUNCE_SAVED_ERROR') || 'Announce not saved'
                    });
                } // => JSON
            });
        }
    });
};

module.exports.updateAnnounce = async(req, res, next)=>{
    res.format({
        html: ()=>{
            return res.render('announce', {
                success: true,
                announces: null,
                message: "Not update announce, It\'s only a test. For implement"
            });
        }, // => HTML
        json: ()=>{
            return res.status(200).json({
                success: true,
                announces: {},
                message: "Not update announce, It\'s only a test. For implement"
            });
        } // => JSON
    });
};

module.exports.deleteAnnounce = async(req, res, next)=>{
    res.format({
        html: ()=>{
            return res.render('announce', {
                success: true,
                message: "Not delete announce, It\'s only a test. For implement"
            });
        }, // => HTML
        json: ()=>{
            return res.status(200).json({
                success: true,
                message: "Not delete announce, It\'s only a test. For implement"
            });
        } // => JSON
    });
};

module.exports.userListAllOwnAnnounces = async(req, res, next)=>{
    let user = req.user_id;
    console.log('USER ID: ', user);
    let _messageRes = req.t('NOT_FOUND_ANNOUNCES_IN_DB') || 'Not found announcements into db';
    announceModel.find({})
    .populate({ path: 'idUserOwn'} )
    .exec((err, announces)=>{
        if(err){
            res.format({
                html: ()=>{
                    return res.status(406).render('announce', {
                        success: false,
                        message: err.message
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(406).json({
                        success: false,
                        message: err.message
                    });
                } // => JSON
            });
        }
        // Yes, there are announces !!
        if(announces){
            res.format({
                html: ()=>{ // Send HTML data
                    return res.render('announce', {
                        success: true,
                        announces: announces
                    });
                }, // => HTML
                json: ()=>{ // Send JSON data
                    return res.status(200).json({
                        success: true,
                        announces: announces
                    });
                } // => JSON
            });
        }else{ // Don't find's announce. [ announce = null || undefined ]
            res.format({
                html: ()=>{
                    return res.render('announce', {
                        success: false,
                        announces: {},
                        message: _messageRes
                    });
                }, // => HTML
                json: ()=>{
                    return res.status(200).json({
                        success: false,
                        message: _messageRes
                    });
                }// => JSON
            });
        }; // end if(announce)

    });
};

/*
module.exports.findByFilterUser = async(req, res, next)=>{
    
};
*/