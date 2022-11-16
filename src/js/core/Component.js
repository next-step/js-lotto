// import { checkInitialState } from '../utils/validate.js';

export default class Component {
  constructor($target, state = { purchasePrice: 0 }) {
    this.$target = $target;
    this.state = state;
    this.render();
    // this.state = checkInitialState(state);
  }

  render() {}

  template() {}

  setState(newState) {
    this.state = newState;
    this.render();
  }
}
