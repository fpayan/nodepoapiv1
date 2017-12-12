'use strict';

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const announceSchema = new Schema({
    nameArticle: {
        type: String,
        required: [true, 'The name of article is required']
    },
    textArticle: {
        type: String
    }, 
    price: {
        type: Number,
        required: [true, 'The price og article is required'],
    },
    salesAnnounce: {
        type: Boolean
    },
    urlImage: {
        type: String, 
        lowercase: true, 
        trim: true, 
        //index: true,
        //unique: true,
        required: [true, 'The picture of article is required'],
    },
    tags: {
        type: String,
        enum:['work', 'lifestyle', 'motor', 'mobile']
    },
    idUserOwn: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});


module.exports = mongoose.model('Announce', announceSchema);