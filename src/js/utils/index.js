export const isRangeNumberInLotto = (number) => {
  if (isNaN(number)) return false;
  const regex = /\b([1-9]|[123][0-9]|4[0-5])\b/;
  return regex.test(number);
};

export const $ = (selector) => document.querySelector(selector);

export const addEvent = (eventType, selector, callback) => {
  const children = [...document.querySelectorAll(selector)];
  const isTarget = (target) => children.includes(target) || target.closest(selector);
  document.body.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};

export const chunkArray = (arr, chunkNumber) => {
  return Array.from(Array(Math.ceil(arr.length / chunkNumber)), (_, i) => arr.slice(i * chunkNumber, i * chunkNumber + chunkNumber));
};
