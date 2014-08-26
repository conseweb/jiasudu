'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var validateUniquePath = function(value, callback) {
    var Resource = mongoose.model('Resource');
    Resource.find({
        $and: [{
            path: value
        }, {
            _id: {
                $ne: this._id
            }
        }, {
            site: this.site
        }]
    }, function(err, user) {
        callback(err || user.length === 0);
    });
};

/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        validate: [validateUniquePath, 'This resource already exists']
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
    }).populate('site', 'title sitetitle').exec(cb);
};

mongoose.model('Resource', ResourceSchema);
