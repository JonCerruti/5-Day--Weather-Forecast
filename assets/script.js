function weatherBalloon( city ) {
    var key = 'd8d1b7d44c89e722fd2bab6825b96f63';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=city + &appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherBalloon(  );
  }