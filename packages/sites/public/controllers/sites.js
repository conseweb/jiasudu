'use strict';

angular.module('mean.sites').controller('SitesController', ['$scope', 'Global', 'Sites',
  function($scope, Global, Sites) {
    $scope.global = Global;
    $scope.package = {
      name: 'sites'
    };
  }
]);
