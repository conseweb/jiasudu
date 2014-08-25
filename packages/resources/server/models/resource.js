'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    hash: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    site: {
        type: Schema.ObjectId,
        ref: 'Site'
    }
});

/**
 * Validations
 */
ResourceSchema.path('path').validate(function(path) {
    return !!path;
}, 'Path cannot be blank');

ResourceSchema.path('hash').validate(function(hash) {
    return !!hash;
}, 'Hash cannot be blank');

/**
 * Statics
 */
ResourceSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('site', 'name username').exec(cb);
};

mongoose.model('Resource', ResourceSchema);
