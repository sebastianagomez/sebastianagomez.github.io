let daynames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let dayName = daynames[d.getDay()];
  let monthName = months[d.getMonth()];
  let fulldate =
    dayName +
    ", " +
    monthName +
    " " +
    d.getDate() +
    ", " +
    d.getFullYear();

  document.getElementById("currentdate").textContent = fulldate;

  document.getElementById("currentyear").textContent = d.getFullYear();

  let oLastModif = new Date(document.lastModified);
  document.getElementById("lastModified").textContent = oLastModif;


function toggleMenu(){
document.getElementById("primaryNav").classList.toggle("hide");
}

window.onload = function dateBanner() {
   
  
  let d = new Date();
  let q = d.getDay();

  if (q != 5) {
    document.getElementById("announcement").classList.toggle("hide");
  }
  
};

const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
  img.removeAttribute("data-src");
}

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 200px 0px",
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});

//-------- FORM --------------

function adjustRating(rating) {
  document.getElementById("ratingvalue").innerHTML = rating;
}

function selectResponse() {
const s = document.querySelector('#selected')
const sel = document.querySelector('#selectbrowser');
s.style.display = "block";
s.textContent = sel.value;

}

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
