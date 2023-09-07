export class Element {
  get(selector) {
    return document.querySelector(selector);
  }

  getAll(selector) {
    return document.querySelectorAll(selector);
  }

  getValueByString(selector) {
    return document.querySelector(selector).value;
  }

  getValueByInt(selector) {
    return parseInt(document.querySelector(selector).value, 10);
  }
}
