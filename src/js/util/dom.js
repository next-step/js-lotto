export const $ = (selectors, target = document) => target.querySelector(`.${selectors}`);
export const $$ = (selectors, target = document) => target.querySelectorAll(`.${selectors}`);
