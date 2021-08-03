export function deepFreeze(obj) {
	const props = Object.getOwnPropertyNames(obj);

	props.forEach((name) => {
		const prop = obj[name];
		if (typeof prop === 'object' && prop !== null) {
			deepFreeze(prop);
		}
	});
	return Object.freeze(obj);
}

export function qs($target = document, selector) {
	return $target.querySelector(selector);
}

export function qsa($target = document, selector) {
	return $target.querySelectorAll(selector);
}
