'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Site = mongoose.model('Site');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');


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

/**
 * List of Sites by user
 */
exports.byuser = function(req, res) {
//    if (req.params.userId)
//        console.log(req.params.userId);

    Site.find({'user': req.params.userId}).sort('-created').populate('user', 'name username').exec(function(err, sites) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the sites'
            });
        }
        res.json(sites);

    });
};

exports.validate = function(req, res) {
    // http://scotch.io/tutorials/javascript/scraping-the-web-with-node-js

    url = 'http://www.imdb.com/title/tt1229340/';
    request(url, function(error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
        }
    })
};