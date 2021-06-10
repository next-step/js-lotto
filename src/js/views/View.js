export default class View {
  constructor(el) {
    if (!el) throw el;
    this.el = el;
  }

  show() {
    this.el.style.display = 'block';
    return this;
  }

  hide() {
    this.el.style.display = 'none';
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.el.dispatchEvent(customEvent);
    return this;
  }
}
