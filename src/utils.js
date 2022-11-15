export function getRandomNumber(min, max) {
  const nextMin = Math.ceil(min);
  const nextMax = Math.floor(max);
  return Math.floor(Math.random() * (nextMax - nextMin) + nextMin);
}

export function $(selector) {
  return document.querySelector(selector);
}
