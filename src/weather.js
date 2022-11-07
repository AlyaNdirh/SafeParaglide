let weather = {

    apiKey: "9fd7a449d055dba26a982a3220f32aa2",

    fetchWeather: function (city) {

      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      ) //alert pop up if input box left unfilled or city is invalid or undefined
        .then((response) => {

          if (!response.ok) {

            alert("No weather found.");

            throw new Error("No weather found.");

          }
          //convert an API used from json format to javascript object
          return response.json();

        })

        .then((data) => this.displayWeather(data));
    },
    //function to fetch data from API and display in HTML page
    displayWeather: function (data) {

      const { name } = data;

      const { icon, description } = data.weather[0];

      const { temp, humidity } = data.main;

      const { speed, gust } = data.wind;

      const { lon, lat } = data.coord;

      document.querySelector(".city").innerText = "Weather in " + name;

      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";

      document.querySelector(".description").innerText = description;

      document.querySelector(".temp").innerText = temp + "°C";

      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";

      document.querySelector(".wind").innerText =
        "Wind Speed: " + speed + " km/h";

      document.querySelector(".gust").innerText =
        "Wind Gust: " + gust + " km/h";

      document.querySelector(".lon").innerText =
        "Longitude: " + lon + "°";  

      document.querySelector(".lat").innerText =
        "Latitude: " + lat + "°";  

      document.querySelector(".weather").classList.remove("loading");

      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    //function to fetch user input value
    search: function () {

      this.fetchWeather(document.querySelector(".search-bar").value);

    },

  };
  //call search function when user click on search button
  document.querySelector(".search button").addEventListener("click", function () {

    weather.search();

  });
  //fetch user input value from input box and call search function
  document

    .querySelector(".search-bar")

    .addEventListener("keyup", function (event) {

      if (event.key == "Enter") {

        weather.search();

      }

    });
  //fetch weather for Kota Kinabalu
  weather.fetchWeather("Kota Kinabalu");