import LottoInput from "./components/LottoInput/index.js";
import LottoTickets from "./components/LottoTickets/index.js";
import LottoWinningNumber from "./components/LottoWinningNumber/index.js";
import LottoResultModal from "./components/LottoResultModal/LottoResultModal.js";

import { buildNewState } from "./utils/helpers.js";
import { INITIAL_STATE } from "./utils/constants.js";

export default class App {
  constructor(store) {
    this.state = INITIAL_STATE;
    this.store = store;
    this.init();
  }
  init = () => {
    this.store.registerObserver(
      new LottoInput(".lotto-input", {
        getState: this.getState,
        setState: this.setState,
      }),
      new LottoTickets(".lotto-tickets", {
        getState: this.getState,
        setState: this.setState,
      }),
      new LottoWinningNumber(".lotto-win", {
        getState: this.getState,
        setState: this.setState,
      }),
      new LottoResultModal(".modal", {
        getState: this.getState,
        setState: this.setState,
      })
    );
  };
  getState = () => {
    return this.state;
  };
  setState = (message) => {
    const newState = buildNewState(this.state, message);
    this.state = newState;
    this.store.notifyObservers();
  };
}
