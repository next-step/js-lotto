export const $ = (selector, startNode = document) =>
	startNode.querySelector(selector);
export const $$ = (selector, startNode = document) =>
	Array.from(startNode.querySelectorAll(selector));
