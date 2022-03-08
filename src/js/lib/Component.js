import {$} from "../modules/utils.js";

export default class Component {
  constructor(selector, props) {
    this._target = $(selector);
    this.props = props;
    this.setup();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {}

  render() {
    this._target.innerHTML = this.template();
    this.mounted();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
