export const invert = (object) => {
	if (typeof object !== 'object') {
		return;
	}

	if (object instanceof Map) {
		return new Map([...object.entries()].map(([key, value]) => [value, key]));
	}

	return Object.fromEntries(
		Object.entries(object).map(([key, value]) => [value, key]),
	);
};
