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

const requestURL = 'https:////byui-cit230.github.io/weather/data/towndata.json';
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // console.table(jsonObject);  // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];
        towns.forEach(town => {
            if (town.name == "Preston" || town.name == "Soda Springs" || town.name == "Fish Haven"){
                let card = document.createElement('section')
                let div = document.createElement('div')
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');
                let image = document.createElement('img');

                div.setAttribute('class', 'tInfo')
                h2.textContent = town.name;
                h2.setAttribute('class', 'tName');
                h3.textContent = "Town Motto: " + town.motto;
                h3.setAttribute('class', 'tMoto');
                p1.textContent = "Year Founded: " + town.yearFounded;
                p2.textContent = "Population: " + town.currentPopulation;
                p3.textContent = "Average Rain Fall: " + town.averageRainfall + ' ' + 'in.';
                image.setAttribute('src', `images/${town.photo}`);
                image.setAttribute('alt', town.name);

                div.appendChild(h2);
                div.appendChild(h3);
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(p3);
                card.appendChild(div);
                card.appendChild(image);

                document.querySelector('div.cards').appendChild(card);
            }
        });

    });