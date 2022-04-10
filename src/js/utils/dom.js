export const $ = (selector, target = document.body) =>
  target.querySelector(selector);

export const $$ = (selector, target = document.body) =>
  target.querySelectorAll(selector);

export const resetInputErrorStyle = (selector) => {
  selector.forEach((input) => input.classList.remove('error-input'));
};
