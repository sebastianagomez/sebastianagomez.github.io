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

// ---------- JSON IMAGES-------------

const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })

.then(function (jsonObject) {
    // check for json object
    // console.table(jsonObject);

const towns = jsonObject['towns'];
    
// loop through the array
for (let i=0; i < towns.length; i++) {
    // declare each variable
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let motto = document.createElement('h3');
    let year = document.createElement('p');
    let pop = document.createElement('p');
    let rain = document.createElement('p');
    let image = document.createElement('img');
    let textd = document.createElement('div')
    
    // What each card will have, contatenation of the strings, declaring classes to make CSS easier
    if (towns[i].name == 'Preston'|| towns[i].name == 'Fish Haven' || towns[i].name == 'Soda Springs') {
    
    h2.textContent = towns[i].name;
    motto.textContent = "Town Motto:" + " " + towns[i].motto;    
    year.textContent = "Year Established:" + " " + towns[i].yearFounded;
    pop.textContent = "Current Population:" + " " + towns[i].currentPopulation;
    rain.textContent = "Annual Rainfall:" + " " +  towns[i].averageRainfall;
    image.setAttribute('src', `img/${towns[i].photo}`);
    image.setAttribute('alt', towns[i].name);
    image.setAttribute('class', 'townimg');
    card.setAttribute('class', "home_sect" );
    textd.setAttribute('class', 'home_town_text');

    // build the display by updating as I loop through. Use an "if" statement to select just the towns I want.
    // if (towns[i].name == 'Preston'|| towns[i].name == 'Fish Haven' || towns[i].name == 'Soda Springs') {
        card.appendChild(textd);
        textd.appendChild(h2);
        textd.appendChild(motto);
        textd.appendChild(year);
        textd.appendChild(pop);
        textd.appendChild(rain);
        card.appendChild(image);}

    else {
        card.setAttribute('class', 'home_hide');
    }
        
     document.querySelector('div.town_div').appendChild(card);
}
});