"use strict";

// Kallar funktionen "fetchDataForID" när formen submittas
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchDataForID();
});

// funktion med 2 argument som tar emot stationens id för att hämta route
async function fetchDataForRoute(from, to) {
  try {
    const url = `https://api.resrobot.se/v2.1/trip?format=json&originId=${from}&destId=${to}&passlist=true&showPassingPoints=true&accessId=1b33041e-fe53-492a-8ef5-6de6b1ee9199`;
    const response = await fetch(url);
    const data = await response.json();

    // display data
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

// Funktion som tar emot formens inputs och lägger in det i api som fetchar deras id för att kunna använda det till route
async function fetchDataForID() {
  //getting the inputs and adding them to the api url tofetch info from that station like their id.
  const inputFrom = document.getElementById("station-från").value;
  const inputTo = document.getElementById("station-till").value;
  const url1 = `https://api.resrobot.se/v2.1/location.name?input=${inputFrom}&format=json&accessId=1b33041e-fe53-492a-8ef5-6de6b1ee9199`;
  const url2 = `https://api.resrobot.se/v2.1/location.name?input=${inputTo}&format=json&accessId=1b33041e-fe53-492a-8ef5-6de6b1ee9199`;

  try {
    const res1 = await fetch(url1);
    const data1 = await res1.json();
    const stationIDFrom =
      data1.stopLocationOrCoordLocation[0].StopLocation.extId;

    const res2 = await fetch(url2);
    const data2 = await res2.json();
    const stationIDTo = data2.stopLocationOrCoordLocation[0].StopLocation.extId;

    fetchDataForRoute(stationIDFrom, stationIDTo);
  } catch (error) {
    console.error(error);
  }
}

// Funktion som blandannat loopar genom api datan för att få ut det viktiga informationen för att sedan med DOM visa det på sidan
async function displayData(data) {
  const leg = [];

  // Collect all legs
  data.Trip.forEach((trip) => {
    const { LegList } = trip;

    LegList.Leg.forEach((item) => {
      leg.push(item);
    });
  });

  for (let index = 0; index < leg.length; index++) {
    const currentLeg = leg[index];

    // Create a slide for each leg
    const slideContainer = document.getElementById("swiper");
    const slide = document.createElement("swiper-slide");

    const cardHeading = document.createElement("h2");
    cardHeading.innerHTML = `From: ${currentLeg.Origin.name} <br/> To: ${currentLeg.Destination.name} `;

    slideContainer.appendChild(slide);
    slide.appendChild(cardHeading);

    // Optionally add stop information (concatenated stops into the slide)
    if (currentLeg?.Stops?.Stop) {
      currentLeg.Stops.Stop.map((stop) => {
        // Adding the stops name to slide
        const stops = document.createElement("p");

        if (stop.depTime == undefined) {
          return;
        } else {
          stops.innerHTML = `${stop.name} dep. time: ${stop.depTime},  ${currentLeg.name} mot ${currentLeg.direction}`;
          slide.appendChild(stops);
        }
      });
    }
  }
}
