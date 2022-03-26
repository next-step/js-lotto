export default class Component {
  constructor(target, props = {}) {
    this.$target = target;
    this.$target.innerHTML = this.template();
    this.$props = props;

    this.setEvents();
  }

  setEvents() {}

  template() {
    return ``;
  }
}
