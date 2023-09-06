export class Element {
  get(selector) {
    return document.querySelector(selector);
  }

  getValueByString(selector) {
    return document.querySelector(selector).value;
  }

  getValueByInt(selector) {
    return parseInt(document.querySelector(selector).value, 10);
  }
}
