'use strict';

angular.module('mean.resources').controller('ResourcesController', ['$scope', 'Global', 'Resources',
  function($scope, Global, Resources) {
    $scope.global = Global;
    $scope.package = {
      name: 'resources'
    };
  }
]);
