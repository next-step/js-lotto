export const $ = function (selector) {
	return document.querySelector(selector);
};
export const addEvent = function (target, eventType, callback) {
	target.addEventListener(eventType, callback);
};
export const reduceNumberInputsToNums = function (numberInputArray) {
	return numberInputArray.reduce((acc, cur) => {
		const { valueAsNumber } = cur;
		if (valueAsNumber) {
			return [...acc, cur.valueAsNumber];
		}
		return acc;
	}, []);
};
