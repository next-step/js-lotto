import { ERROR_MESSAGE } from "../constants/message";

const $ = (target) => {
  try {
    if (typeof target !== "string") {
      throw new Error(ERROR_MESSAGE.NOT_A_STRING);
    }
    const element = document.querySelector(target);
    if (!element) {
      throw new Error(ERROR_MESSAGE.ELEMENT_NOT_FOUND(target));
    }
    return element;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const $$ = (target) => {
  try {
    if (typeof target !== "string") {
      console.error(ERROR_MESSAGE.TARGET_NOT_STRING);
    }
    const elements = document.querySelectorAll(target);
    if (elements.length === 0) {
      console.error(ERROR_MESSAGE.ELEMENT_NOT_FOUND(target));
    }
    return [...elements];
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export { $, $$ };
