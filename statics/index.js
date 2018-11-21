angular.module('myApp', [
  'oc.lazyLoad'
])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug: true,
    events: true,
    modules: [{
      name: 'MyModule',
      files: ['module.js']
    },
    {
      name: 'MyModule2',
      files: ['module2.js']
    }]
  });
}])
.controller("example", ["$scope", function ($scope) {
  $scope.date = new Date();
}])
.controller("example2", ["$scope", "$ocLazyLoad", function ($scope, $ocLazyLoad) {
  $scope.names = ["Alice", "Bob"];
  $scope.delayed = false;

  $scope.clicked = function() {
    $scope.delayed = true;
  }

  $scope.lazyLoadError = function () {
    console.log('parent error handler');
  }

  $scope.clicked2 = function() {
    $ocLazyLoad.load('MyModule2')
      .then(() => {
        console.log("success");
      }).catch(error => {
        console.log(error);
      });
  };
}]);

window.applicationCache.addEventListener('updateready', function(e) {
  console.log("App cache status: " + window.applicationCache.status);
});

window.addEventListener('load', function(e) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      console.log('application cache unchanged...')
    }

    console.log("App cache status: " + window.applicationCache.status);
  }, false);
}, false);


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
});

document.addEventListener('readystatechange', () => {
  console.log('readyState:' + document.readyState);
});
