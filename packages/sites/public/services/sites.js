'use strict';

//Sites service used for sites REST endpoint
// why can not inject Global , $scope ?
angular.module('mean.sites').factory('Sites', ['$resource',
    function($resource) {
        var sites = $resource('/user/:userId/sites/:siteId', {
            siteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        return sites;
    }
]);
