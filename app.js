'use strict';

var app = angular.module('deliciousDashboardApp', ['ngRoute','ngStorage'])
.config(function ($routeProvider) {
  $routeProvider
	.when("/", { templateUrl: "dashboard.html" })
	.when("/settings", { templateUrl: "settings.html" })
	.otherwise({ redirectTo: "/" });
});

//var username = "bl00p";
//var mytags = ['news','socialnetworking','bitcoin','nxt','mwork','tools','1-click','web2.0','musik','clubs','latest'];
//var privateKey = "-FynrgFmtek897_Z93-mME6OwS41XnWHOpKs8zXY8sQ=";
var titleLimit = 34;
var deliciousURL = "http://feeds.delicious.com/v2/json/"

app.controller('mainCtrl', function($scope, $localStorage, $location) {
	$scope.$storage = $localStorage;
	$scope.mytags = $scope.$storage.favoritetags.split(',');
	if (!$scope.$storage.username) { $location.path('/settings'); }  
	//$scope.mytags = mytags;
	$scope.titleLimit = titleLimit;
	angular.forEach(document.querySelectorAll('.main-search'), function(elem) { elem.focus(); });
	$scope.toggleTags = function(){
		if($scope.mytags == 'latest') {
			$scope.mytags = mytags;
		} else {
			$scope.mytags = ['latest'];
		}
	}
});
app.controller('getLinksCtrl', function($scope,$http) {
	if (!$scope.tag) throw new Error("No Tag for LinksController");
	if ($scope.tag == 'latest') { $scope.tag = '' } else { $scope.tag = '/' + $scope.tag };
	var username = $scope.$storage.username;
	if ($scope.$storage.privatekey) { var privateKey = ';private=' + $scope.$storage.privatekey; }
	$http.get(deliciousURL + username + $scope.tag + '?count=100' + privateKey).then(function(articlesResponse) {
    		$scope.links = articlesResponse.data;
	})
});

app.controller('settingsStorageCtrl', function($scope, $localStorage) {
//	if (!$scope.lsvalue) throw new Error("No lsvalue for settingsStorageController");
});

