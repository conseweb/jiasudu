'use strict';

angular.module('mean.sites').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('sites example page', {
      url: '/sites/example',
      templateUrl: 'sites/views/index.html'
    });
  }
]);
