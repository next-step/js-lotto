export const range = (start, end, step = 1) => {
	if (typeof end === 'undefined') {
		return range(0, start, step);
	}

	const iterable = {
		*[Symbol.iterator]() {
			let previous = start - step;

			while (previous < end - step) {
				yield (previous += step);
			}
		},
	};

	return iterable;
};
