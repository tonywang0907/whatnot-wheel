/* NBA Wheel Spin */
let nbaContainer = document.querySelector("#nba-tab-content .container-2");
let nbaBtn = document.getElementById("nba-spin-btn");
let nbaTeamsArray = Array.from(document.querySelectorAll("#wheel .nba-team"));
let nbaNumSelected = 0;

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
  nbaTeamsArray[nbaTeamsLength - idx] = "selected";
  nbaNumSelected += 1;

  let rotationIncrement = 360 / nbaTeamsLength; 
  rotation = rotationIncrement * rotateAmount.value; 
  nbaContainer.style.transform = "rotate(" + rotation + "deg)";

  
  nbaContainer.addEventListener("transitionend", function() {
    selectedTeam.classList.add("selected");
  });
}

function nbaTeamRepCheck(rotateAmount) {
  rotateAmount.value = Math.floor(Math.random() * 600);
  let idx = rotateAmount.value % nbaTeamsLength;

  let selectedTeam = nbaTeamsArray[nbaTeamsLength - idx];

  if (selectedTeam === "selected") {
    nbaTeamRepCheck(rotateAmount);
  }
}

/* MLB Wheel Spin */
let mlbContainer = document.querySelector("#mlb-tab-content .container-2");
let mlbBtn = document.getElementById("mlb-spin-btn");
let mlbTeamsArray = Array.from(document.querySelectorAll("#wheel .mlb-team"));
let mlbNumSelected = 0;

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

  });
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
