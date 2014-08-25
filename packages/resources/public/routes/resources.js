'use strict';

angular.module('mean.resources').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('resources example page', {
      url: '/resources/example',
      templateUrl: 'resources/views/index.html'
    });
  }
]);
