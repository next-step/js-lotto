export const $ = (selector, target) => {
  if (target === undefined) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $all = selector => document.querySelectorAll(selector);

export const $addEvent = ($element, eventType, listenser) =>
  $element.addEventListener(eventType, listenser);
