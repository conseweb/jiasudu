'use strict';

//Sites service used for sites REST endpoint
angular.module('mean.sites').factory('Sites', ['$resource',
    function($resource) {
        return $resource('sites/:siteId', {
            siteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
