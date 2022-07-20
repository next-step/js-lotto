import { View } from "../Views/View.js";
import { Model } from "../Models/Model.js";

export class Controller {
  view;
  model;
  properties;

  constructor(view, model, properties = {}) {
    if (!(view instanceof View)) throw new TypeError("view should be a instance of View");
    if (!(model instanceof Model)) throw new TypeError("model should be a instance of Model");
    this.view = view;
    this.model = model;
    this.properties = properties;
  }

  render() {
    this.view.render(this.model.state);
  }

  get state() {
    return this.model.state;
  }

  reset() {
    this.model.reset();
    this.render();
  }
}
