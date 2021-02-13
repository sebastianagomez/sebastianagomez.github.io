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

function dateBanner() {
  var d = new Date();
  var n = d.getDay()
  if(n === 5) {
      var element = document.getElementById("announement")
      element.classList.add("showBanner");
      return;
  }
  else {
      var element = document.getElementById("announement")
      element.classList.add("closeBanner");
      return;
  }
  
}

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