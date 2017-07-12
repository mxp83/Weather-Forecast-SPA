// Module
var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);

// Controllers

weatherApp.controller('homeController', ['$scope',function($scope){
    
}]);
weatherApp.controller('forecastController', ['$scope',function($scope)]{
                                             
});
                                             
// Routes
weatherApp.config(function ($routeProvider){
    $routeProvider
    
    .when('/', {
        templateUrl: 'PAGES/home.htm',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'PAGES/forecast.htm',
        controller: 'forecastController'
    })
});