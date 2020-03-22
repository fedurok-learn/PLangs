// my versions of used functions
const dat = require("./data.js");

const _toArrOfArrs = arr => arr.map(el => [el]);
const _combArrs = (head, ...tail) => tail.length === 0 ? _toArrOfArrs(head) : _combArrs(...tail).map(pr => head.map(el => pr.concat(el))).flat(); 

const lift = fn => (...arrs) => _combArrs(...arrs).map(arr => fn(...arr.reverse()));

const myGameGen = lift((type, difficulty, hours) => ({ type, difficulty, hours }));
const myGames = myGameGen(dat.gameTypes, dat.gameDifficulties, dat.gameHours);

console.log(myGames);
console.log(myGames.length);

