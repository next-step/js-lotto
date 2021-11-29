export default class View {
  tag = "View";
  $elem;
  hiddenClassName = "hide";

  constructor() {}

  init(element) {
    if (!element) throw element;
    this.$elem = element;

    console.log(`[${this.tag}] $elem: ${this.$elem}`);

    return this;
  }

  on(event, handler) {
    this.$elem.addEventListener(event, handler);
    return this;
  }

  emit(event, data, option = {}) {
    const newCustomEvent = new CustomEvent(event, {
      detail: data,
      ...option
    });

    this.$elem.dispatchEvent(newCustomEvent);
    return this;
  }

  show() {
    this.$elem.classList.remove(this.hiddenClassName);
    return this;
  }

  hide() {
    this.$elem.classList.add(this.hiddenClassName);
    return this;
  }
}
