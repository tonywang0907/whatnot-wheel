/* NBA Wheel Spin */
let nbaContainer = document.querySelector("#nba-tab-content .container-2");
let nbaBtn = document.getElementById("nba-spin-btn");
let nbaTeamsArray = Array.from(document.querySelectorAll("#wheel .nba-team"));
let nbaNumSelected = 0;
let nbaCurrTeamIdx = 0;

const nbaTeamsLength = nbaTeamsArray.length;
nbaTeamsArray[nbaTeamsArray.length] = nbaTeamsArray[0];

function NBASpin() {
  let rotation = 0;

  if (nbaNumSelected === nbaTeamsLength) {
    document.getElementById("nba-spin-btn").disabled = false;
    return;
  }

  let rotateAmount = { value: 0 }; // Create an object to hold the rotateAmount value

  nbaTeamRepCheck(rotateAmount);

  let idx = rotateAmount.value % nbaTeamsLength;
  // console.log(idx);

  let selectedTeam = nbaTeamsArray[nbaTeamsLength - idx];
  // console.log("team:", selectedTeam.textContent);
  nbaTeamsArray[nbaTeamsLength - idx] = "selected";
  nbaNumSelected += 1;

  let rotationIncrement = 360 / nbaTeamsLength; 
  rotation = rotationIncrement * rotateAmount.value; 
  nbaContainer.style.transform = "rotate(" + rotation + "deg)";

  nbaContainer.addEventListener("transitionend", function() {
    selectedTeam.classList.add("selected");
    let currTeamInput = document.querySelector("#nba-team" + nbaCurrTeamIdx + " input");
    setTimeout(function() {
      currTeamInput.value = " " + selectedTeam.textContent;
    }, 1000);
  });
  nbaCurrTeamIdx += 1;
}

function nbaTeamRepCheck(rotateAmount) {
  rotateAmount.value = Math.floor(Math.random() * 600);
  let idx = rotateAmount.value % nbaTeamsLength;

  let selectedTeam = nbaTeamsArray[nbaTeamsLength - idx];

  if (selectedTeam === "selected") {
    nbaTeamRepCheck(rotateAmount);
  }
}

/* NFL Wheel Spin */
let nflContainer = document.querySelector("#nfl-tab-content .container-2");
let nflBtn = document.getElementById("nfl-spin-btn");
let nflTeamsArray = Array.from(document.querySelectorAll("#wheel .nfl-team"));
let nflNumSelected = 0;
let nflCurrTeamIdx = 0;

const nflTeamsLength = nflTeamsArray.length;
nflTeamsArray[nflTeamsArray.length] = nflTeamsArray[0];

function NFLSpin() {
  let rotation = 0;

  if (nflNumSelected === nflTeamsLength) {
    document.getElementById("nfl-spin-btn").disabled = false;
    return;
  }

  let rotateAmount = { value: 0 }; 

  nflTeamRepCheck(rotateAmount);

  let idx = rotateAmount.value % nflTeamsLength;
  // console.log(idx);

  let selectedTeam = nflTeamsArray[nflTeamsLength - idx];
  // console.log("team:", selectedTeam.textContent);
  nflTeamsArray[nflTeamsLength - idx] = "selected";
  nflNumSelected += 1;

  let rotationIncrement = 360 / nflTeamsLength; 
  rotation = rotationIncrement * rotateAmount.value; 
  nflContainer.style.transform = "rotate(" + rotation + "deg)";

  
  nflContainer.addEventListener("transitionend", function() {
    selectedTeam.classList.add("selected");
    let currTeamInput = document.querySelector("#nfl-team" + nflCurrTeamIdx + " input");
    setTimeout(function() {
      currTeamInput.value = " " + selectedTeam.textContent;
    }, 1000);
  });
  nflCurrTeamIdx += 1;
}

function nflTeamRepCheck(rotateAmount) {
  rotateAmount.value = Math.floor(Math.random() * 600);
  let idx = rotateAmount.value % nflTeamsLength;

  let selectedTeam = nflTeamsArray[nflTeamsLength - idx];

  if (selectedTeam === "selected") {
    nflTeamRepCheck(rotateAmount);
  }
}

/* MLB Wheel Spin */
let mlbContainer = document.querySelector("#mlb-tab-content .container-2");
let mlbBtn = document.getElementById("mlb-spin-btn");
let mlbTeamsArray = Array.from(document.querySelectorAll("#wheel .mlb-team"));
let mlbNumSelected = 0;
let mlbCurrTeamIdx = 0;

const mlbTeamsLength = mlbTeamsArray.length;
mlbTeamsArray[mlbTeamsArray.length] = mlbTeamsArray[0];

function MLBSpin() {
  let rotation = 0;

  if (mlbNumSelected === mlbTeamsLength) {
    document.getElementById("mlb-spin-btn").disabled = false;
    return;
  }

  let rotateAmount = { value: 0 }; 

  mlbTeamRepCheck(rotateAmount);

  let idx = rotateAmount.value % mlbTeamsLength;
  // console.log(idx);

  let selectedTeam = mlbTeamsArray[mlbTeamsLength - idx];
  // console.log("team:", selectedTeam.textContent);
  mlbTeamsArray[mlbTeamsLength - idx] = "selected";
  mlbNumSelected += 1;

  let rotationIncrement = 360 / mlbTeamsLength; 
  rotation = rotationIncrement * rotateAmount.value; 
  mlbContainer.style.transform = "rotate(" + rotation + "deg)";

  
  mlbContainer.addEventListener("transitionend", function() {
    selectedTeam.classList.add("selected");
    let currTeamInput = document.querySelector("#mlb-team" + mlbCurrTeamIdx + " input");
    setTimeout(function() {
      currTeamInput.value = " " + selectedTeam.textContent;
    }, 1000);
  });
  mlbCurrTeamIdx += 1;
}

function mlbTeamRepCheck(rotateAmount) {
  rotateAmount.value = Math.floor(Math.random() * 600);
  let idx = rotateAmount.value % mlbTeamsLength;

  let selectedTeam = mlbTeamsArray[mlbTeamsLength - idx];

  if (selectedTeam === "selected") {
    mlbTeamRepCheck(rotateAmount);
  }
}

/* Selecting Tab */ 
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

function selectItem(e) {
  removeBorder();
  removeShow();
  this.classList.add('tab-border');
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add('show');
}

function removeBorder() {
  tabItems.forEach(item => item.classList.remove('tab-border'))
}

function removeShow() {
  tabContentItems.forEach(item => item.classList.remove('show'))
}

tabItems.forEach(item => item.addEventListener('click', selectItem));


/* Wheel Reset Button */
document.getElementById("reset-btn").addEventListener("click", function() {
  location.reload();
});

/* Prevent Submit Button from refreshing the page */
document.getElementById("my-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Perform any additional actions or validation here

  // Optional: You can make an asynchronous request to submit the form data
  // using JavaScript's Fetch API or XMLHttpRequest.

  // Example using Fetch API:
  /*
  fetch("/submit-url", {
    method: "POST",
    body: new FormData(event.target)
  })
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    // Handle any errors
  });
  */
});

/* Export Data to Google Sheets */





