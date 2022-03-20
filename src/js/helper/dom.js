import { isNil } from './valid.js';

export const $ = (selector, target) => {
  if (isNil(target)) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $all = (selector, target) => {
  if (isNil(target)) return document.querySelectorAll(selector);
  return target.querySelectorAll(selector);
};

export const $addEvent = ($element, eventType, listenser) =>
  $element.addEventListener(eventType, listenser);

export const $renderWithEventBind = getElement => args => {
  try {
    const [$element, $events = []] = getElement(args);
    if (!($element instanceof Element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
    $events.forEach(({ type, callback }) => $addEvent($element, type, callback));
    return $element;
  } catch (error) {
    alert(error.message);
    return null;
  }
};
