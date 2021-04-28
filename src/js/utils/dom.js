export const $ = (selector, target = document) =>
  target.querySelector(selector);

// export const $setClass = ()

export const BUY_SELECTOR = {
  FORM: "#input-price-form",
  BUTTON: "#input-price-btn",
  INPUT: "#input-price",
};

export const VIEW_SELECTOR = {
  SECTION: "#purchased-lottos",
  LOTTOS: "#lotto-icons",
  TOTAL: "#total-purchased",
};
