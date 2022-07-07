var enterCity = document.getElementById('enter-city')
var searchBtn = document.getElementById('search-button')
var clearHist = document.getElementById('clear-history')
var hist = document.getElementById('history')
var todayWeather = document.getElementById('today-weather')
var cityName = document.getElementById('city-name')
var currentCity = document.getElementById('current-pic')
var temp = document.getElementById('temperature')
var humidity = document.getElementById('humidity')
var windSpeed = document.getElementById('wind-speed')
var uVIndex = document.getElementById('UV-index')
var fiveDayHead = document.getElementById('fiveday-header')
















function weatherBalloon( cityID ) {
    const key = 'd8d1b7d44c89e722fd2bab6825b96f63';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherBalloon( 6167865 );
  }