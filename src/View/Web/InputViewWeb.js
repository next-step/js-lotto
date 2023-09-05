export class InputViewWeb {
  getElement(selector) {
    return document.querySelector(selector);
  }

  getElementValueByString(selector) {
    return document.querySelector(selector).value;
  }

  getElementValueByInt(selector) {
    return parseInt(document.querySelector(selector).value, 10);
  }
}
