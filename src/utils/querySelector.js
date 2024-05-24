const $ = (target) => {
  return document.querySelector(target);
};

const $$ = (target) => {
  return document.querySelectorAll(target);
};

export { $, $$ };
