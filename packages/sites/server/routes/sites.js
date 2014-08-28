'use strict';

var sites = require('../controllers/sites');

// Site authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.site.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Sites, app, auth) {

    app.route('/sites')
        .get(sites.all);
    app.route('/sites/u/:userId')
        .get(sites.byuser);
//        .get(auth.requiresLogin, hasAuthorization, sites.byuser);
    app.route('/sites')
        .post(auth.requiresLogin, sites.create);
    app.route('/sites/:siteId')
        .get(sites.show)
        .put(auth.requiresLogin, hasAuthorization, sites.update)
        .delete(auth.requiresLogin, hasAuthorization, sites.destroy);

    // Finish with setting up the siteId param
    app.param('siteId', sites.site);
//    app.param('userId', sites.user);
};
