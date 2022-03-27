export const $ = (selector, target = document.body) =>
  target.querySelector(selector);

export const $$ = (selector, target = document.body) =>
  target.querySelectorAll(selector);
