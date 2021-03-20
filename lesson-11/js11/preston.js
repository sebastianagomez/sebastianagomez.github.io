// PRESTON EVENT 

const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // console.table(jsonObject);  // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];
        towns.forEach(town => {
            if (town.name == "Preston"){
                let event = document.createElement('div')
                let div = document.createElement('div')
 
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');
                let p4 = document.createElement('p');

                div.setAttribute('class', 'eventInfo')
                p1.textContent = town.events[0];
                p2.textContent = town.events[1];
                p3.textContent = town.events[2];
                p4.textContent = town.events[3];


                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                div.appendChild(p4);
                event.appendChild(div);

                document.querySelector('div.current-events').appendChild(event);
            }
        });

    });

// ------- WEATHER API -----------

//CURRENT WEATHER DATA
// Give JS the address of the weather API with city code, imperial units, and APPID

const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=31faaedc2de9ab98c63a927fb8525e85";

// Use Fetch to retrieve apiURL. Convert string to json object. Print to console log to check it works and evaluate what data is available to use.
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);

    // assign js Objects to elements by ID. Pay close attention to which data is in an array.
    document.getElementById("cond").textContent = jsObject.weather[0].main;
    document.getElementById("temp").textContent = Math.round(
      jsObject.main.temp
    );
    document.getElementById("speed").textContent = Math.round(
      jsObject.wind.speed
    );
    document.getElementById("humid_pct").textContent =
      jsObject.main.humidity + "%";

    // Use weather API data to calculate wind chill. Be sure to parseFloat to convert string data to numbers.
    let t = jsObject.main.temp;
    let w = jsObject.wind.speed;

    if (t <= 50 && w >= 3) {
      let wc =
        35.74 +
        0.6215 * t -
        35.75 * Math.pow(w, 0.16) +
        0.4275 * t * Math.pow(w, 0.16);

      wc = document.getElementById("windchill_num").innerHTML =
        Math.round(wc) + "&deg; " + "F";
    } else {
      wc = "Not Applicable";

      document.getElementById("windchill_num").innerHTML = wc;
    }
  });

//FIVE DAY FORECAST DATA

// List the URL of the API forecast data
const apiforecastURL =
"https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=31faaedc2de9ab98c63a927fb8525e85";

// As before, fetch the forecast data, create the JSON object, console log to make sure it worked.
fetch(apiforecastURL)
.then((response) => response.json())
.then((jsObject) => {
  // Create an array with day names to use for five day forecast
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter the jsObject to only show data from 6:00 pm (18:00:00)
  const thefive = jsObject.list.filter((element) =>
    element.dt_txt.includes("18:00:00")
  );

  // Use a "for" loop to loop through the data and fill the table
  let day = 0;
  let i = 0;

  for (i = 0; i < thefive.length; i++) {
    let d = new Date(thefive[i].dt_txt); //date object to get date

    //write day name using array built earlier
    document.getElementById("dayofweek" + (day + 1)).textContent =
      dayName[d.getDay()];

    // write temperature data. Use Math.round to make it a whole number.
    document.getElementById("forecast" + (day + 1)).textContent =
      Math.round(thefive[day].main.temp) + " °F";

    // give the browser the icon address
    var imagesrc =
      "https://openweathermap.org/img/w/" +
      thefive[day].weather[0].icon +
      ".png";

    // populate table with icons, set alt attribute using weather description from the object
    document.getElementById("imagesrc" + (day + 1)).textContent = imagesrc;
    document.getElementById("icon" + (day + 1)).setAttribute("src", imagesrc);
    document
      .getElementById("icon" + (day + 1))
      .setAttribute("alt", thefive[0].weather[0].description);

    day++;
  }
});