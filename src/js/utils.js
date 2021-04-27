export const $ = (sel, parent = document) => parent.querySelector(sel);
$.id = (id, parent) => $(`#${id}`, parent);
$.klass = (klass, parent) => $(`.${klass}`, parent);
export const err = msg => {
  throw msg;
};
export const warn = msg => alert(msg);
export const log = (...args) => console.log(...args);
