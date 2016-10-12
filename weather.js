function render(data) {
      console.log('render', data)
      var element = document.getElementById('current_weather');
      element.innerHTML = "The weather for " + data.day + ", " + data.date + " is "+ data.text + ", with a high of " + data.high +" and a low of " + data.low;
    }

    var callbackFunction = function(data) {
      render(data.query.results.channel.item.forecast[0]);
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
