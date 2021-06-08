export const $ = (selector, parent = document) =>
  parent.querySelector(selector);
$.id = (id, parent) => $(`[id='${id}']`, parent);
$.klass = (klass, parent) => $(`.${klass}`, parent);
$.all = (selector, parent = document) => parent.querySelectorAll(selector);
$.klass.all = (klass, parent) => $.all(`.${klass}`, parent);

export const err = msg => {
  throw msg;
};

export const warn = msg => alert(msg);

export const log = (...args) => console.log(...args);

export const random = (startInclusive = 0, endExclusive = 1) => {
  if (typeof endExclusive === typeof undefined)
    [endExclusive, startInclusive] = [startInclusive, 0];

  return Math.floor(
    startInclusive + Math.random() * (endExclusive - startInclusive),
  );
};

const [hexadecimals, delimiter] = ['0123456789abcdef', '-'];
const delimiterIndex = [8, 13, 18, 23];
/**
 * Generates ver.4 UUID
 * @returns {string} UUID - 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
 */
export const uuidV4 = _ =>
  Array.from({ length: 36 }, (_, i) =>
    delimiterIndex.includes(i)
      ? delimiter
      : hexadecimals[random(hexadecimals.length)],
  ).join('');

export const floor = num => Math.floor(num);

export const timeout = (...args) => setTimeout(...args);

export const freeze = obj => Object.freeze(obj);
