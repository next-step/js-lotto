import { MODAL_CONTROL_CLASS, MODAL_SELECTOR } from '../services/constants.js';
import { safeExecutor } from './utils.js';
import { isDOMElement, isNil } from './valid.js';

export const $ = (selector, target) => {
  if (isNil(target)) return document.querySelector(selector);
  return target.querySelector(selector);
};

export const $all = (selector, target) => {
  if (isNil(target)) return document.querySelectorAll(selector);
  return target.querySelectorAll(selector);
};

export const $addEvent = safeExecutor(([$element, eventType, listenser]) => {
  if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
  $element.addEventListener(eventType, listenser);
});

export const $removeClass = safeExecutor(([$element, className]) => {
  if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
  $element.classList.remove(className);
  return $element;
});

export const $elementToggleClass = safeExecutor(([$element, className]) => {
  if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
  $element.classList.toggle(className);
  return $element;
});

export const $elements = stringHTML => {
  const root = document.createElement('div');
  root.innerHTML = stringHTML;
  return root.firstElementChild;
};

export const $open = (selector = MODAL_SELECTOR, className = MODAL_CONTROL_CLASS) => {
  $(selector).classList.add(className);
};

export const $close = (selector = MODAL_SELECTOR, className = MODAL_CONTROL_CLASS) => {
  $(selector).classList.remove(className);
};

export const $handleDOMError = ({ $element, isReset, error }) => {
  if ($element && $element instanceof HTMLElement && isReset) {
    $element.value = '';
    $element.textContent = '';
  }

  alert(error.message);
};

export const $allElementProp = (selector, prop, target) => {
  if (isNil(target)) return Array.from($all(selector)).map($element => $element[prop]);
  return Array.from($all(selector, target)).map($element => $element[prop]);
};

// TODO: DOM Parser를 만들어 렌더링을 루트 앱에서 진행합니다.
export const $eventBindedComponent = getElement => args => {
  try {
    const [$element, $events = []] = getElement(args);
    if (!isDOMElement($element)) throw new Error('첫 번째 인자로 DOM 요소를 선언해주세요.');
    $events.forEach(({ type, callback }) => $addEvent($element, type, callback));
    return $element;
  } catch (error) {
    alert(error.message);
    return null;
  }
};
