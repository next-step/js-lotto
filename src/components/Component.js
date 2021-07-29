import { $ } from "../utils/selectors.js";

export default class Component {
  constructor(app, props) {
    this.$app = $(app);
    this.props = props;
  }
  template = () => {};
  mount = () => {};
  render = () => {
    this.$app.innerHTML = this.template();
  };
}
