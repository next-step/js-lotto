import { LOTTO } from "./constant.js";

export const $ = (selector, parent = document) =>
  parent.querySelector(selector);

export const addClass = (target, ...clsName) =>
  target?.classList?.add(...clsName);

export const removeClass = (target, ...clsName) =>
  target?.classList?.remove(...clsName);

export const warnMsg = (msg) => alert(msg);

export const createElement = (tagName, ...clsName) => {
  const element = document.createElement(tagName);
  element.classList.add(...clsName);
  return element;
};

export const setDisabled = (...targetList) => {
  targetList.forEach((target) => target.setAttribute("disabled", true));
};

export const setElementDisplay = (target, isShow) => {
  if (isShow) {
    removeClass(target, "d-none");
  } else {
    addClass(target, "d-none");
  }
};

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getCardCount = (price) => parseInt(price / LOTTO.CARD_PRICE);
