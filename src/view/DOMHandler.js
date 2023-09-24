export const getQuerySelector = (query, $target) =>
  $target ? $target.querySelector(query) : document.querySelector(query);
export const getQuerySelectorAll = (query, $target) =>
  $target ? $target.querySelector(query) : document.querySelector(query);
export const createElement = (element) => document.createElement(element);
export const createFragment = () => document.createDocumentFragment();
export const createHeading = (headingType, textContent) => {
  const $heading = createElement(headingType);
  $heading.textContent = textContent;
  return $heading;
};
export const clearElement = (element) => element.replaceChildren();
export const findElementByTag = (parent, tagName) => parent.getElementsByTagName(tagName);
export const clearClassNames = (element) => (element.className = '');
export const addClassNames = (element, classNames) => element.classList.add(...classNames);
export const removeClassNames = (element, classNames) => element.classList.remove(...classNames);
