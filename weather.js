function render(data) {
      var element = document.getElementById('current_weather');
      var forecast = document.getElementById('show_weather');
      element.innerHTML = "";
      forecast.innerHTML = "";
      console.log('render', data)

      element.innerHTML = today_display(data[0]);

      for (var i =1; i<4; i++){
          forecast.innerHTML += forecast_display(data[i]);
      }

    }
    var today_display = function (today){
        return "The weather for " + today.day + ", " + today.date + " is "+ today.text + ", with a high of " + today.high +" and a low of " + today.low;
    }

    var forecast_display = function (future){
        return `
        <div class="forecast_display">
          <img src="" alt="today">
          <p>` + future.day + `</p>
          <p>` + future.text + `</p>
          <p>Low: ` + future.low + `</p>
          <p>High: ` + future.high + `</p>
       </div>`
    }

    var callbackFunction = function(data) {
      render(data.query.results.channel.item.forecast);
    };

    // (address: string)
    function loadWeather(address) {
    	loadScript("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + address + "')&format=json&callback=callbackFunction")
    }

    // (url: string)
    function loadScript(url) {
    	var script = document.createElement('script')
      script.src = url
      document.body.appendChild(script)
    }

    document.getElementById('button').addEventListener("click",function(){
      loadWeather(document.getElementById('location').value);
    });
