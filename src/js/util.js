export const $ = function (selector) {
  return document.querySelector(selector);
};
export const addEvent = function (target, eventType, callback) {
  target.addEventListener(eventType, callback);
};
