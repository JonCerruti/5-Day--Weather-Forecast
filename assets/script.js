var apiKey = "d8d1b7d44c89e722fd2bab6825b96f63";
var today = moment().format('L');
var searchHistoryList = [];

// function that gets current weather and starts app
function currentWeather(city) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
// get from api for a city
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(getCity) {
        console.log(getCity);
        
        $("#weatherContent").css("display", "block");
        $("#cityCoordinate").empty();
        
        var iconCode = getCity.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        // get the current city and retrieve these params from open weather api
        var currentCity = $(`
            <h2 id="currentCity">
                ${getCity.name} ${today} <img src="${iconURL}" alt="${getCity.weather[0].description}" />
            </h2>
            <p>Temperature: ${getCity.main.temp} °F</p>
            <p>Humidity: ${getCity.main.humidity}\%</p>
            <p>Wind Speed: ${getCity.wind.speed} MPH</p>
        `);

        $("#cityCoordinate").append(currentCity);

        // get uv index by coordinate from open weather api
        var lat = getCity.coord.lat;
        var lon = getCity.coord.lon;
        var uviQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: "GET"
        }).then(function(getUVI) {
            console.log(getUVI);

            var uvIndex = getUVI.value;
            var uvIndexP = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $("#cityCoordinate").append(uvIndexP);

            futureWeather(lat, lon);

            // styling for uv index based on value
            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  
        });
    });
}

// function to get future weather
function futureWeather(lat, lon) {

    
    var futureURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    // get method to get 5 day forecast
    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function(getForecast) {
        console.log(getForecast);
        $("#fiveDayForecast").empty();
        //loop to get weather for less than 6 days
        for (let i = 1; i < 6; i++) {
            var cityInfo = {
                date: getForecast.daily[i].dt,
                icon: getForecast.daily[i].weather[0].icon,
                temp: getForecast.daily[i].temp.day,
                humidity: getForecast.daily[i].humidity
            };

            var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${getForecast.daily[i].weather[0].main}" />`;

            //create card that gets info from api and places in called spots
            var forecast = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-success text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${currDate}</h5>
                            <p>${iconURL}</p>
                            <p>Temp: ${cityInfo.temp} °F</p>
                            <p>Humidity: ${cityInfo.humidity}\%</p>
                        </div>
                    </div>
                <div>
            `);

            $("#fiveDayForecast").append(forecast);
        }
    }); 
}

//  click function that renders serch history from local storage
$("#searchButton").on("click", function(event) {
    event.preventDefault();

    var city = $("#searchCity").val().trim();
    currentWeather(city);
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#History").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});

// click function that renders clicked on city weather and forecast from history
$(document).on("click", ".list-group-item", function() {
    var listCity = $(this).text();
    currentWeather(listCity);
});

// function that when app opens it renders last searched city
$(document).ready(function() {
    var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if (searchHistoryArr !== null) {
        var lastSearchedIndex = searchHistoryArr.length - 1;
        var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
        currentWeather(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});














