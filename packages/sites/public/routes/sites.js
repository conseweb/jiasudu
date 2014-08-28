'use strict';

//Setting up route
angular.module('mean.sites').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        // states for my app
        $stateProvider
            .state('getAllSitesByUser', {
                url: '/user/:userId/sites',
                templateUrl: 'sites/views/list.html',
                resolve:{
                    loggedin: checkLoggedin
                }
            })
            .state('createsite', {
                url: '/user/:userId/sites/create',
                templateUrl: 'sites/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit site', {
                url: '/user/:userId/sites/:siteId/edit',
                templateUrl: 'sites/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('site by id', {
                url: '/user/:userId/sites/:siteId',
                templateUrl: 'sites/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
