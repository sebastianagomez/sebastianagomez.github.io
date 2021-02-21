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

WebFont.load({
  google: {
    families: [
       'Hachi'
    ]
  }
});

// WindChill

let temp = parseFloat(document.querySelector('#tempF').textContent);
let wspeed = parseFloat(document.querySelector('#speed').textContent);
document.querySelector('#windchill').textContent = windChill(temp, wspeed);;

function windChill(tempF, speed) {

    let winch = 35.74 + 0.6215 * tempF - 35.75 * (Math.pow(speed, 0.16)) + 0.4275 * tempF * (Math.pow(speed, 0.16));
    return winch.toFixed(2);
}

const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;
  img.removeAttribute('data-src');
}

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 10px 0px",
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach(image => {
  imgObserver.observe(image);
});