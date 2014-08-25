'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var SiteSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
SiteSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

SiteSchema.path('domain').validate(function(domain) {
    return !!domain;
}, 'Domain cannot be blank');

/**
 * Statics
 */
SiteSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Site', SiteSchema);
