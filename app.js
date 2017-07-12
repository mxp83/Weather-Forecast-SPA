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
});

// Services
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
})
// Controllers

weatherApp.controller('homeController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=03ceb6e5f6fa839cb4e36d0685f15a6a", {
        callback: "JSON_CALLBACK" }, {get: { method: "JSONP" }}
    );
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });
    
    
}]);