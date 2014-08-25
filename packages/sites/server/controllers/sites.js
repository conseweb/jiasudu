'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Site = mongoose.model('Site'),
    _ = require('lodash');


/**
 * Find site by id
 */
exports.site = function(req, res, next, id) {
    Site.load(id, function(err, site) {
        if (err) return next(err);
        if (!site) return next(new Error('Failed to load site ' + id));
        req.site = site;
        next();
    });
};

/**
 * Create an site
 */
exports.create = function(req, res) {
    var site = new Site(req.body);
    site.user = req.user;

    site.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the site'
            });
        }
        res.json(site);

    });
};

/**
 * Update an site
 */
exports.update = function(req, res) {
    var site = req.site;

    site = _.extend(site, req.body);

    site.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the site'
            });
        }
        res.json(site);

    });
};

/**
 * Delete an site
 */
exports.destroy = function(req, res) {
    var site = req.site;

    site.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the site'
            });
        }
        res.json(site);

    });
};

/**
 * Show an site
 */
exports.show = function(req, res) {
    res.json(req.site);
};

/**
 * List of Sites
 */
exports.all = function(req, res) {
    Site.find().sort('-created').populate('user', 'name username').exec(function(err, sites) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the sites'
            });
        }
        res.json(sites);

    });
};
