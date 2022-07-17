import { View } from "../Views/View.js";
import { Model } from "../Models/Model.js";

export class Controller {
  view;
  model;

  constructor(view, model) {
    if (!(view instanceof View)) throw new TypeError("view should be a instance of View");
    if (!(model instanceof Model)) throw new TypeError("model should be a instance of Model");
    this.view = view;
    this.model = model;
  }

  render() {
    console.log(this.model.state);
    this.view.render(this.model.state);
  }
}
