export default class View {
  constructor(el) {
    if (!el) throw el;
    this.$target = el;
  }

  on(event, handler) {
    this.$target.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    this.$target.dispatchEvent(customEvent);
    return this;
  }

  show() {
    this.$target.style.display = 'block';
    return this;
  }

  hide() {
    this.$target.style.display = 'none';
    return this;
  }
}
