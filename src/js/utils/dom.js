const $ = (selctor, el = document) => el.querySelector(selctor);
const $all = (selector, el = document) => el.querySelectorAll(selector);

export { $, $all };