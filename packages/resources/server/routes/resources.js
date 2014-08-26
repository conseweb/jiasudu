'use strict';

var resources = require('../controllers/resources');

// Resource authorization helpers
//var hasAuthorization = function(req, res, next) {
//    if (!req.user.isAdmin && req.site.user.id !== req.user.id) {
//        return res.send(401, 'User is not authorized');
//    }
//    next();
//};

module.exports = function(Resources, app, auth) {

    app.route('/resources')
        .get(resources.all)
        .post(resources.create);
    app.route('/resources/:resourceId')
        .get(resources.show)
        .put(resources.update)
        .delete(resources.destroy);

    // Finish with setting up the siteId param
    app.param('resourceId', resources.resource);
};


// The Package is past automatically as first parameter
//module.exports = function(Resources, app, auth, database) {
//
//  app.get('/resources/example/anyone', function(req, res, next) {
//    res.send('Anyone can access this');
//  });
//
//  app.get('/resources/example/auth', auth.requiresLogin, function(req, res, next) {
//    res.send('Only authenticated users can access this');
//  });
//
//  app.get('/resources/example/admin', auth.requiresAdmin, function(req, res, next) {
//    res.send('Only users with Admin role can access this');
//  });
//
//  app.get('/resources/example/render', function(req, res, next) {
//    Resources.render('index', {
//      package: 'resources'
//    }, function(err, html) {
//      //Rendering a view from the Package server/views
//      res.send(html);
//    });
//  });
//
//  app.post('/resources', function(req, res, next) {
//    res.json('ok');
//  });
//};
