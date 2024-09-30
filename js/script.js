async function fetchDataForID(event) {
  //getting the inputs and adding them to the api url tofetch info from that station like their id.
  const inputFrom = document.getElementById("station-från").value;
  const inputTo = document.getElementById("station-till").value;
  const url1 = `https://api.resrobot.se/v2.1/location.name?input=${inputFrom}&format=json&accessId=1b33041e-fe53-492a-8ef5-6de6b1ee9199`;
  const url2 = `https://api.resrobot.se/v2.1/location.name?input=${inputTo}&format=json&accessId=1b33041e-fe53-492a-8ef5-6de6b1ee9199`;

  event.preventDefault();

  //Fetching the id of the inputed FROM station by the api call.
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      let stationIDFrom =
        data.stopLocationOrCoordLocation[0].StopLocation.extId;
      console.log(stationIDFrom);
    })
    .catch((error) => {
      console.error(error);
    });

  //Fetching the id of the inputed TO station by the api call.
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      const stationIDTo =
        data.stopLocationOrCoordLocation[0].StopLocation.extId;
      console.log(stationIDTo);
    })
    .catch((error) => {
      console.error(error);
    });
}

function formSubmittion() {
  document.getElementById("form").addEventListener("submit", fetchDataForID);
}

formSubmittion();

// async function fetchDataForRoute(event) {
//   event.preventDefault();

//   url =
// }
