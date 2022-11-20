class Controller {
  constructor($target) {
    this.$target = $target;
    this.initEventHandler();
    this.render();
  }

  addChangeEvent(event) {}

  addClickEvent(event) {}

  initEventHandler() {
    this.$target.addEventListener('click', (event) => {
      this.addChangeEvent(event);
      this.render();
    });
    this.$target.addEventListener('change', (event) => {
      this.addClickEvent(event);
      this.render();
    });
  }

  render() {}
}
