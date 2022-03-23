class View {
  constructor({ $target, props }) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.makeTemplate();
  }

  makeTemplate() {
    return ``;
  }
}

export default View;
