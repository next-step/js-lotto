export default class Component {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {}

  template() {
    return '';
  }
}
