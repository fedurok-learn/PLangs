// Task: create object from list of 
const R = require("ramda");
const dat = require("./data.js");

const gameGen = R.lift((type, difficulty, hours) => ({ type, difficulty, hours }));
const games = gameGen(dat.gameTypes, dat.gameDifficulties, dat.gameHours);

console.log(games);
console.log(games.length);
