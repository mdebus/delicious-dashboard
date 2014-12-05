'use strict';

//var privateKey = "-FynrgFmtek897_Z93-mME6OwS41XnWHOpKs8zXY8sQ=";
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
	$scope.$storage = $localStorage;
	if($scope.$storage.favoritetags) { $scope.mytags = $scope.$storage.favoritetags.split(','); } else {  $scope.mytags = ['latest']; }
	if (!$scope.$storage.username) { $location.path('/settings'); }  
	$scope.titleLimit = titleLimit;
	angular.forEach(document.querySelectorAll('.main-search'), function(elem) { elem.focus(); });
});

app.controller('getLinksCtrl', function($scope,$http) {
	if (!$scope.tag) throw new Error("No Tag for LinksController");
	if ($scope.tag == 'latest') { $scope.tag = '' } else { $scope.tag = '/' + $scope.tag };
	if ($scope.$storage.privatekey) { var privateKey = ';private=' + $scope.$storage.privatekey; }
	$http.get(deliciousURL + $scope.$storage.username + $scope.tag + '?count=100' + privateKey).then(function(articlesResponse) {
    		$scope.links = articlesResponse.data;
	})
});
