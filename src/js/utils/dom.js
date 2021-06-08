'use strict';

const $ = (selector, element = document) => {
  return element.querySelector(selector);
};

const $$ = (selector, element = document) => {
  return element.querySelectorAll(selector);
};

export { $, $$ };
