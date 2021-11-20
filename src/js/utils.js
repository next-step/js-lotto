export const $ = (selector, el = document) => el.querySelector(selector);

export const $$ = (selector, el = document) => el.querySelectorAll(selector);

export const getFormDataValue = (formData, key) => formData.get(key);
