// import { checkInitialState } from '../utils/validate.js';

export default class Component {
  constructor($target, state = { purchasePrice: 0 }) {
    this.$target = $target;
    this.state = state;
    this.setup();
    this.render();
    this.setEvent();
    // this.state = checkInitialState(state);
  }

  setup() {}

  render() {}

  template() {}

  setEvent() {}

  setState(newState) {
    this.state = newState;
    this.render();
  }
}
