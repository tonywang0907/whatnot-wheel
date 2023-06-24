let streamURL = null;

function getUsername(idx, sports) {
  fetch("/backend", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(streamURL),
  })
    .then(function (response) {
      return response.json(response);
    })
    .then(function (text) {
      // console.log('POST response:');
      // console.log(text);
      setUsername(idx, text, sports);
    });
}

function setUsername(idx, username, sports) {
  let currUserInput = document.querySelector(
    "#" + sports + "-user" + idx + " input"
  );
  currUserInput.value = " " + username;
}

function spin(data) {
  if (streamURL != null) {
    getUsername(data.userIdx, data.sports);
  }

  data.userIdx += 1;
  let rotation = 0;

  if (data.numSelected === data.teamsLength) {
    data.btn.disabled = false;
    return;
  }

  let rotateAmount = { value: 0 };

  teamRepCheck(rotateAmount, data.teamsArray, data.teamsLength);

  let idx = rotateAmount.value % data.teamsLength;
  let selectedTeam = data.teamsArray[data.teamsLength - idx];
  data.teamsArray[data.teamsLength - idx] = "selected";
  data.numSelected += 1;

  let rotationIncrement = 360 / data.teamsLength;
  rotation = rotationIncrement * rotateAmount.value;
  data.container.style.transform = "rotate(" + rotation + "deg)";

  data.container.addEventListener("transitionend", function () {
    selectedTeam.classList.add("selected");
    let currTeamInput = document.querySelector(
      "#" + data.sports + "-team" + data.currTeamIdx + " input"
    );
    setTimeout(function () {
      currTeamInput.value = " " + selectedTeam.textContent;
    }, 1000);
  });
  data.currTeamIdx += 1;
}

function teamRepCheck(rotateAmount, teamsArray, teamsLength) {
  rotateAmount.value = Math.floor(Math.random() * 600);
  let idx = rotateAmount.value % teamsLength;
  let selectedTeam = teamsArray[teamsLength - idx];
  if (selectedTeam === "selected") {
    teamRepCheck(rotateAmount, teamsArray, teamsLength);
  }
}

/* NBA Wheel Spin */
const nbaData = {
  sports: "nba",
  container: document.querySelector("#nba-tab-content .container-2"),
  btn: document.getElementById("nba-spin-btn"),
  teamsArray: Array.from(document.querySelectorAll("#wheel .nba-team")),
  numSelected: 0,
  currTeamIdx: 0,
  teamsLength: 0,
  userIdx: 1,
};
nbaData.teamsLength = nbaData.teamsArray.length;
nbaData.teamsArray[nbaData.teamsArray.length] = nbaData.teamsArray[0];

function NBASpin() {
  spin(nbaData);
}

/* NFL Wheel Spin */
const nflData = {
  sports: "nfl",
  container: document.querySelector("#nfl-tab-content .container-2"),
  btn: document.getElementById("nfl-spin-btn"),
  teamsArray: Array.from(document.querySelectorAll("#wheel .nfl-team")),
  numSelected: 0,
  currTeamIdx: 0,
  teamsLength: 0,
  userIdx: 1,
};
nflData.teamsLength = nflData.teamsArray.length;
nflData.teamsArray[nflData.teamsArray.length] = nflData.teamsArray[0];

function NFLSpin() {
  spin(nflData);
}

/* MLB Wheel Spin */
const mlbData = {
  sports: "mlb",
  container: document.querySelector("#mlb-tab-content .container-2"),
  btn: document.getElementById("mlb-spin-btn"),
  teamsArray: Array.from(document.querySelectorAll("#wheel .mlb-team")),
  numSelected: 0,
  currTeamIdx: 0,
  teamsLength: 0,
  userIdx: 1,
};
mlbData.teamsLength = mlbData.teamsArray.length;
mlbData.teamsArray[mlbData.teamsArray.length] = mlbData.teamsArray[0];

function MLBSpin() {
  spin(mlbData);
}

/* Selecting Tab */
const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

function selectItem(e) {
  removeBorder();
  removeShow();
  this.classList.add("tab-border");
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add("show");
}

function removeBorder() {
  tabItems.forEach((item) => item.classList.remove("tab-border"));
}

function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}

tabItems.forEach((item) => item.addEventListener("click", selectItem));

/* Wheel Reset Button */
document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});

/* Prevent Submit Button from refreshing the page */
document.getElementById("my-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const textField = document.getElementById("my-textfield");
  streamURL = textField.value;
});

/* Export Break Sheet */
document.getElementById("export-btn").addEventListener("click", function () {
  // console.log("Export button clicked");
  // Your data preparation code here
  const dataRows = [];

  // Retrieve the left table element
  const activeTab = document.querySelector(".show");
  const leftTable = activeTab.querySelector("#left-table");
  const leftRows = leftTable.getElementsByTagName("tr");

  // Loop through each row of the left table (skipping the first row)
  for (let i = 1; i < leftRows.length; i++) {
    const row = leftRows[i];

    // Retrieve the username and team values from the input fields
    const username = row.cells[0].querySelector("input").value;
    const team = row.cells[1].querySelector("input").value;

    // Add the username and team values to the dataRows array
    dataRows.push([username, team]);
  }

  // Retrieve the right table element
  const rightTable = activeTab.querySelector("#right-table");
  const rightRows = rightTable.getElementsByTagName("tr");

  // Loop through each row of the right table (skipping the first row)
  for (let i = 1; i < rightRows.length; i++) {
    const row = rightRows[i];

    // Retrieve the username and team values from the input fields
    const username = row.cells[0].querySelector("input").value;
    const team = row.cells[1].querySelector("input").value;

    // Add the username and team values to the dataRows array
    dataRows.push([username, team]);
  }

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add the title row
  worksheet.addRow(["Username", "Team"]);

  // Add the data rows
  dataRows.forEach((row) => {
    worksheet.addRow(row);
  });

  // Generate the Excel file
  workbook.xlsx
    .writeBuffer()
    .then(function (buffer) {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const fileName = "data.xlsx";

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      // console.log("Export completed");
    })
    .catch(function (error) {
      // console.error("Export error:", error);
    });
});
