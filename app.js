'use strict';

var app = angular.module('tutorialApp', []);
var username = "bl00p";
var mytags = ['news','socialnetworking','nxt','web2.0'];

app.controller('mainCtrl', function($scope) {
	$scope.mytags = mytags;
});
app.controller('getLinksCtrl', function($scope, $http) {
	if (!$scope.tag) throw new Error("No Tag for LinksController");
	$http.get('http://feeds.delicious.com/v2/json/' + username + '/' + $scope.tag).then(function(articlesResponse) {
    		$scope.links = articlesResponse.data;
	})
});

