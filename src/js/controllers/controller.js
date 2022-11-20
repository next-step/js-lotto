class Controller {
  constructor($target, model) {
    this.$target = $target;
    this.model = model;
    this.initEventHandler();
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
