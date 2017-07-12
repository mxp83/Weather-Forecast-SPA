// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

                                             
// Routes
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});

// Services
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
})
// Controllers

weatherApp.controller('homeController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=03ceb6e5f6fa839cb4e36d0685f15a6a", {
        callback: "JSON_CALLBACK" }, {get: { method: "JSONP" }}
    );
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    $scope.convertToCelsius = function(degK) {
        return Math.round(degK - 273.15);
    }
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);