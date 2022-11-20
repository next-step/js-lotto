class Controller {
  constructor($target) {
    this.$target = $target;
    this.initEventHandler();
    this.render();
  }

  addChangeEvent() {}

  addClickEvent() {}

  initEventHandler() {
    this.$target.addEventListener('click', (event) => {
      this.addClickEvent(event);
      this.render();
    });
    this.$target.addEventListener('change', (event) => {
      this.addChangeEvent(event);
      this.render();
    });
  }

  render() {}
}

export default Controller;
