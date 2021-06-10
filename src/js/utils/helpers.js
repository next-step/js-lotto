export const $ = (target, dom = document) => dom.querySelector(target);
export const $$ = (target, dom = document) => dom.querySelectorAll(target);
export const $hide = (target) => target.classList.add('hidden');
export const $show = (target) => target.classList.remove('hidden');
export const $addClass = (target, newClass) => target.classList.add(newClass);
export const $removeClass = (target, newClass) =>
  target.classList.remove(newClass);

export const $on = (target, type, callback) => {
  target.addEventListener(type, callback);
};
