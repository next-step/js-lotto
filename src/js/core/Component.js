export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.setUp();
    this.render();
    this.setEvent();
  }

  setUp() {}

  setState(newState) {
    this.state = { ...newState };
    this.render();
  }

  setEvent() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  template() {
    return '';
  }
}
