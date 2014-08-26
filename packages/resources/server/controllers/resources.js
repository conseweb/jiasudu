'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Resource = mongoose.model('Resource');
var _ = require('lodash');


/**
 * Find resource by id
 */
exports.resource = function(req, res, next, id) {
    Resource.load(id, function(err, resource) {
        if (err) return next(err);
        if (!resource) return next(new Error('Failed to load resource ' + id));
        req.resource = resource;
        next();
    });
};

/**
 * Create an resource
 */
exports.create = function(req, res) {
    var resource = new Resource(req.body);
    resource.user = req.user;

    resource.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the resource',
                detail: err
            });
        }
        res.json(resource);

    });
};

/**
 * Update an resource
 */
exports.update = function(req, res) {
    var resource = req.resource;

    resource = _.extend(resource, req.body);

    resource.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the resource',
                detail: err
            });
        }
        res.json(resource);

    });
};

/**
 * Delete an resource
 */
exports.destroy = function(req, res) {
    var resource = req.resource;

    resource.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the resource',
                detail: err
            });
        }
        res.json(resource);

    });
};

/**
 * Show an resource
 */
exports.show = function(req, res) {
    res.json(req.resource);
};

/**
 * List of Resources
 */
exports.all = function(req, res) {
    Resource.find().sort('-created').populate('user', 'name username').exec(function(err, resources) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the resources',
                detail: err
            });
        }
        res.json(resources);

    });
};
