export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function $(selector) {
  return document.querySelector(selector);
}
