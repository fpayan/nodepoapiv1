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
        unique: true,
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

announceSchema.statics.list = function(filters, limit, skip, sort, fields) {
    // obtenemos la query sin ejecutarla
    const query = Announce.find(filters);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort)
    query.select(fields);
    // ejecutamos la query y devolvemos una promesa
    return query.exec();
}

module.exports = mongoose.model('Announce', announceSchema);