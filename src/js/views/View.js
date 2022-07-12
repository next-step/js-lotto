export default class View {
  constructor(element) {
    this.element = element;
    this.originalDisplay = this.element.style.display || '';
    return this;
  }

  hide() {
    this.element.style.display = 'none';
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  on(eventName, handler) {
    this.element.addEventListener(eventName, handler);
    return this;
  }

  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.element.dispatchEvent(event);
    return this;
  }
}
