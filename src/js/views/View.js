export default class View {
  constructor($element) {
    if (!$element) throw $element;
    this.$element = $element;
  }

  show() {
    this.$element.style.display = 'block';
    return this;
  }

  hide() {
    this.$element.style.display = 'none';
    return this;
  }

  on(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
    return this;
  }

  emit(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
    return this;
  }
}
