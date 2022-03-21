export default class Component {
  constructor(target, props = {}, state = {}) {
    this.$target = target;
    this.$props = props;
    this.$state = state;

    this.setState(state);
    this.setEvents();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.$target.innerHTML = this.template();
  }

  setEvents() {}

  render() {}

  template() {
    return ``;
  }
}
