export const $ = (selector, elements = document) => elements.querySelector(selector);

export const $$ = (selector, elements = document) => elements.querySelectorAll(selector);

export const getFormDataValue = (formData, key) => formData.get(key);

