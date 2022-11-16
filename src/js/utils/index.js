export const $ = (selector) => document.querySelector(selector);

export const randomLotto = (max = 45) => {
  if (Math.random === 0) return;

  return Math.ceil(Math.random() * max);
};
