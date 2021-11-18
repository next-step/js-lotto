export const $ = (selector, el = document) => el.querySelector(selector);

export const $$ = (selector, el = document) => el.querySelectorAll(selector);

export const getFormDataValue = (formData, key) => formData.get(key);

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * max) + min;

export const showElement = (el) => {
  el.style.display = 'block';
};

export const hideElement = (el) => {
  el.style.display = 'none';
};

export const setCommaThusandUnit = (money) => {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
