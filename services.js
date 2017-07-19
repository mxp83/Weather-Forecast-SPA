// Services
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
});

weatherApp.service('weatherService', ['$resource', function($resource){
    this.GetWeather = function(city, days) {
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=03ceb6e5f6fa839cb4e36d0685f15a6a", {
            callback: "JSON_CALLBACK" }, {get: { method: "JSONP" }}
        );

        return weatherAPI.get({ q: city, cnt: days }); 
    };
}]);