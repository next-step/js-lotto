class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.render(this.model);
    this.initEventHandler();
  }

  addChangeEvent() {}

  addClickEvent() {}

  addSubmitEvent() {}

  initEventHandler() {
    this.view.$target.addEventListener('submit', (event) => {
      this.addSubmitEvent(event);
      this.view.render(this.model);
    });
    this.view.$target.addEventListener('click', (event) => {
      this.addClickEvent(event);
      this.view.render(this.model);
    });
    this.view.$target.addEventListener('change', (event) => {
      this.addChangeEvent(event);
      this.view.render(this.model);
    });
  }
}

export default Controller;
