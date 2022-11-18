import { checkInitialState } from '../utils/validate.js';

export default class Component {
  constructor(
    $target,
    state = {
      purchasePrice: 0,
      ticketCount: 0,
      tickets: [],
      isNumberVisible: false,
    },
  ) {
    this.$target = $target;
    this.state = checkInitialState(state);
    this.init();
    this.render();
    this.setEvent();
  }

  init() {}

  render() {}

  template() {}

  setEvent() {}

  setState(newState) {
    this.state = newState;
    this.render();
  }
}
