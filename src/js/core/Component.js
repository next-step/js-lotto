export default class Component {
  constructor(target, props = {}) {
    this.$target = target;
    this.$props = props;
    this.$target.innerHTML = this.template();

    this.setEvents();
  }

  setEvents() {}

  template() {
    return ``;
  }
}
