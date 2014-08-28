'use strict';

angular.module('mean.sites').controller('SitesController', ['$scope', '$stateParams', '$location', 'Global', 'Sites',
  function($scope, $stateParams, $location, Global, Sites) {
      $scope.global = Global;

      $scope.hasAuthorization = function(site) {
          if (!site || !site.user) return false;
          return $scope.global.isAdmin || site.user._id === $scope.global.user._id;
      };

      $scope.create = function(isValid) {
          if (isValid) {
              var site = new Sites({
                  title: this.title,
                  domain: this.domain
              });
              var userId = $scope.global.user._id;
              site.$save({userId: $stateParams.userId}, function(response) {
                  $location.path('user/' + userId + '/sites/' + response._id);
              });

              this.title = '';
              this.domain = '';
          } else {
              $scope.submitted = true;
          }
      };

      $scope.remove = function(site) {
          if (site) {
              site.$remove();

              // remove it from client side records
              for (var i in $scope.sites) {
                  if ($scope.sites[i] === site) {
                      $scope.sites.splice(i, 1);
                  }
              }
          } else {
              $scope.site.$remove(function(response) {
                  $location.path('user/' + $scope.global.user._id + 'sites');
              });
          }
      };

      $scope.update = function(isValid) {
          if (isValid) {
              var site = $scope.site;
              if (!site.updated) {
                  site.updated = [];
              }
              site.updated.push(new Date().getTime());

              site.$update(function() {
                  $location.path('user/' + $scope.global.user._id + '/sites/' + site._id);
              });
          } else {
              $scope.submitted = true;
          }
      };

      $scope.find = function() {
          var sites = Sites.query({userId: $stateParams.userId}, function() {
              $scope.sites = sites;
          });
      };

      $scope.findOne = function() {
          Sites.get({
              userId: $stateParams.userId,
              siteId: $stateParams.siteId
          }, function(site) {
              $scope.site = site;
          });
      };
  }
]);
