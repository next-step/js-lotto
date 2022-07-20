const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
};

const go = (...args) => reduce((a, f) => f(a), args);

const isTruthy = (e) => !!e;

const includes = (arr, number) => arr.includes(number);

export { go, reduce, isTruthy, includes };
