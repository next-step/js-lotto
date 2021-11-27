export default class Component {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {
    document.addEventListener("stateChange", () => {
      this.render();
    });
  }

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
