const dat = require('./data.js');

// impl

const _unc = {}; // object with uncurried functions

const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

_unc.pipe = (head, ...tail) => (...args) => tail.reduce((prev, fn) => fn(prev), head(...args));
_unc.compose = (...fns) => pipe(...fns.reverse());
_unc.map = (fn, arr) => arr.map(fn);
_unc.reduce = (fn, def, arr) => arr.reduce(fn, def, arr);
const sum = arr => arr.reduce((acc, val) => acc + val, 0);

const flip = fn => (fst, snd) => curry(fn)(fst)(snd);
_unc.useWith = (fn, fnarr) => (...args) => fn(...args.map((val, i) => fnarr[i](val)));
const addIndex = origFn => curry((cb, arr) => {
				let i = 0;
				return origFn(val => cb(val, i++, arr), arr);
});

const _splitAt = (idx, arr) => [arr.slice(0, idx), arr.slice(idx)];
_unc.splitAt = (idx, arr) => idx >= 0 ? _splitAt(idx, arr) : _splitAt(arr.length + idx, arr);

const identity = x => x;
const negate = x => -x;
_unc.multiply = (a, b) => a * b;
_unc.max = (a, b) => a > b ? a : b;

const reverse = it => typeof it === 'string' ? reverse(it.split('')).join('') : it.reverse();
const flatten = arr => arr.flat(Infinity);
_unc.times = (f, n) => {
				let res = [];
				for (let i = 0; i < n; ++i) res.push(f(i));
				return res;
};

const _makeGlobalAndCurry = (obj) => {
		Object
			.entries(obj)
			.forEach(([name, member]) => { global[name] = curry(member); });
};
_makeGlobalAndCurry(_unc);

// use

const rotateN = pipe(useWith(splitAt, [negate, identity]), reverse, flatten);

const mapIndexed = addIndex(map);
const F = compose(sum, mapIndexed(multiply));

const maxEl = reduce(max, Number.MIN_VALUE);
const Fn = curry((arr, n) => F(rotateN(n, arr)));

const maxFn = arr => maxEl(times(Fn(arr), arr.length));

console.log(maxFn(dat.arr));
