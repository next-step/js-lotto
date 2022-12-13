/**
 * @type {number[]}
 * @param {string[]} array
 */
export const convertToNumbers = (array) => array.map(Number);

export const extractNumberOnly = (s) => s.replace(/[^\d]+/, '');
