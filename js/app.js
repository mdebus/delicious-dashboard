'use strict';

var titleLimit = 34;
var deliciousURL = "http://feeds.delicious.com/v2/json/"

var app = angular.module('deliciousDashboardApp', ['ngRoute','ngStorage'])
.config(function ($routeProvider) {
  $routeProvider
	.when("/", { templateUrl: "partials/dashboard.html" })
	.when("/settings", { templateUrl: "partials/settings.html" })
	.otherwise({ redirectTo: "/" });
});

app.controller('mainCtrl', function($scope, $localStorage, $location) {
	$scope.$storage = $localStorage.$default({ favoritetags: 'latest' });
	if (!$scope.$storage.username) { $location.path('/settings'); }  
});

app.controller('dashboardCtrl', function($scope, $window) {
	$scope.mytags = $scope.$storage.favoritetags.split(',');
	if($scope.mytags.length > 6) { 
		$scope.columnheight = ($window.innerHeight - 35) / 2 - 20;
	} else {
		$scope.columnheight = $window.innerHeight - 55;
	};
	$scope.titleLimit = titleLimit;
});

app.controller('getLinksCtrl', function($scope, $http) {
	if (!$scope.thistag) throw new Error("No Tag for LinksController");
	if ($scope.thistag == 'latest') { $scope.thistag = '' } else { $scope.thistag = '/' + $scope.thistag };
	if ($scope.$storage.privatekey) { var privateKey = ';private=' + $scope.$storage.privatekey; }
	$http.get(deliciousURL + $scope.$storage.username + $scope.thistag + '?count=100' + privateKey).then(function(articlesResponse) {
    		$scope.links = articlesResponse.data;
	})
});

app.controller('settingsCtrl', function($scope, $http) {
});
