export const $ = (target, dom = document) => dom.querySelector(target);
export const $$ = (target, dom = document) => dom.querySelectorAll(target);

export const $on = (target, type, callback) => {
  target.addEventListener(type, callback);
};