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

    app.route('/user/:userId/sites')
        .get(sites.byuser)
        .post(sites.create);
//        .post(auth.requiresLogin, sites.create);
    app.route('/sites')
        .get(sites.all);
//        .get(auth.requiresLogin, hasAuthorization, sites.byuser);
    app.route('/user/:userId/sites/:siteId')
        .get(sites.show)
        .put(auth.requiresLogin, hasAuthorization, sites.update)
        .delete(auth.requiresLogin, hasAuthorization, sites.destroy);

    // Finish with setting up the siteId param
    app.param('siteId', sites.site);
//    app.param('userId', sites.user);
};
