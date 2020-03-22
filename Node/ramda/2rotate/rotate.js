// https://leetcode.com/problems/rotate-function/
const R = require('ramda');
const dat = require('./data.js');

const rotateN = R.pipe(R.useWith(R.splitAt, [R.negate, R.identity]), R.reverse, R.flatten);

const mapIndexed = R.addIndex(R.map);
const F = R.compose(R.sum, mapIndexed(R.multiply));

const maxEl = R.reduce(R.max, Number.MIN_VALUE);
const Fn = R.curry(R.compose(F, R.flip(rotateN)));

const maxFn = arr => maxEl(R.times(Fn(arr), arr.length));

console.log(maxFn(dat.arr));
