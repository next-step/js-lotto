export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $all = (selector, target = document) =>
  target.querySelectorAll(selector);

export const $addClass = (target, selector) => target.classList.add(selector);
export const $removeClass = (target, selector) =>
  target.classList.remove(selector);
export const $attr = (target, selector, attribute) =>
  target.setAttribute(selector, attribute);

export const BUY_SELECTOR = {
  FORM: "#input-price-form",
  BUTTON: "#input-price-btn",
  INPUT: "#input-price",
};

export const VIEW_SELECTOR = {
  SECTION: "#purchased-lottos",
  LOTTOS: "#lotto-icons",
  TOTAL: "#total-purchased",
  SWITCH: "#lotto-switch",
  LOTTO_DETAIL: ".lotto-detail",
};
