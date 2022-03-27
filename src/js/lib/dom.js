export const $ = (selector, startNode = document) =>
	startNode.querySelector(selector);
export const $$ = (selector, startNode = document) =>
	Array.from(startNode.querySelectorAll(selector));

export const show = (element, display = 'block') => {
	element.style.display = display;
};

export const hide = (element) => {
	element.style.display = 'none';
};
