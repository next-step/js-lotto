export const $ = (selector, target) => {
  if (target === undefined) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $all = selector => document.querySelectorAll(selector);

export const $addEvent = ($element, eventType, listenser) =>
  $element.addEventListener(eventType, listenser);

export const last = (array, ...args) => array[array.length - 1][args[0]];

export const isNull = value => value === null || value === undefined;

export const isEquals = (target1, target2) => target1 === target2;
