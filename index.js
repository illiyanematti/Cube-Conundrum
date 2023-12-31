const fs = require("fs");

// Main //
function main() {
  const data = getData();
  let gameData = getGameData(data);
  partOne(gameData);
  partTwo(gameData);
}

// Functions //

function partOne(inputData) {
  let totalSum = process(inputData);
  consoleResults("Part ONE", totalSum);
}

function partTwo(allData) {
  let totalSum_two = processPartTwo(allData);
  consoleResults("Part TWO", totalSum_two);
}

function processPartTwo(theData) {
  let secondSum = 0;

  Object.keys(theData).forEach((thisKey) => {
    let multiplied = 0;
    let min = { blue: 0, red: 0, green: 0 };
    let theDetail = theData[thisKey];

    theDetail.forEach((detail) => {
      if (detail.blue > min.blue) min.blue = detail.blue;
      if (detail.green > min.green) min.green = detail.green;
      if (detail.red > min.red) min.red = detail.red;
    });
    multiplied = min.blue * min.green * min.red;
    secondSum += multiplied;
  });
  return secondSum;
}

function process(gData) {
  let sum = 0;
  Object.keys(gData).forEach((key) => {
    let possible = true;
    let gDetail = gData[key];
    gDetail.forEach((gdet) => {
      if (possible && (gdet.blue > 14 || gdet.green > 13 || gdet.red > 12)) {
        possible = false;
      }
    });
    if (possible) {
      sum += parseInt(key);
    }
  });
  return sum;
}

function getGameData(thisData) {
  let gd = {};
  thisData.forEach((game) => {
    const [gameNumber, gameSet] = getGameDetails(game);
    gd[gameNumber] = gameSet;
  });
  return gd;
}

function getGameDetails(gameDetail) {
  let [key, value] = gameDetail.split(":");
  key = parseInt(key.replace("Game ", ""));

  let valueArray = value.split(";");
  value = iterateArray(valueArray);
  return [key, value];
}

function consoleResults(part, answer) {
  console.log("Answer for " + part + " is: " + answer);
}

function iterateArray(thisArray) {
  const colors = ["blue", "red", "green"];
  let mainObject = [];
  let subObject = {};

  thisArray.forEach((element) => {
    let elementArray = element.split(" ");
    subObject = {};
    elementArray.forEach((el, i) => {
      el = el.replace(",", "");
      if (colors.includes(el)) {
        subObject[el] = parseInt(elementArray[i - 1]);
      }
    });
    mainObject.push(subObject);
  });
  return mainObject;
}

function getData() {
  const allData = fs.readFileSync("input.txt").toString();
  const dataArray = allData.trim().split("\n");
  return dataArray;
}

// Run the script
main();
