import { DEFAULT_LOTTO_STATE } from '../constant.js';

class Lotto {
  constructor($target) {
    this.$target = $target;
    this.state = {
      ...DEFAULT_LOTTO_STATE,
    };
  }

  setState(nextState) {
    this.state = nextState;
  }
}

export default Lotto;
