import LottoInput from "./components/LottoInput/index.js";
import LottoTickets from "./components/LottoTickets/index.js";
import LottoWinningNumber from "./components/LottoWinningNumber/index.js";
import LottoResultModal from "./components/LottoResultModal/LottoResultModal.js";

import { LOTTOS_ACTION, LOTTOS_STATE, LOTTOS_RESULT, LOTTO_MIN, LOTTO_MAX } from "./utils/constants.js";
import { shuffle } from "./utils/helpers.js";

export default class App {
  constructor(store, initialState) {
    this.state = initialState;
    this.store = store;
    this.init();
  }

  init = () => {
    this.store.registerObserver(
      {
        key: "lottoInput",
        component: new LottoInput(".lotto-input", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: "lottoTicket",
        component: new LottoTickets(".lotto-tickets", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: "lottoWinningNumber",
        component: new LottoWinningNumber(".lotto-win", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: "lottoResultModal",
        component: new LottoResultModal(".modal", {
          getState: this.getState,
          setState: this.setState,
        }),
      }
    );
  };

  getState = () => {
    return this.state;
  };

  setState = (message) => {
    const [newState, keys] = this.buildNewState(this.state, message);
    this.state = newState;
    this.store.notifyObservers(keys);
  };

  buildNewState = (prevState, { type, data }) => {
    switch (type) {
      case LOTTOS_ACTION.UPDATE:
        return this.updateLottos(prevState, data);
      case LOTTOS_ACTION.TOGGLE:
        return this.updateToggleDisplay(prevState, data);
      case LOTTOS_ACTION.SHOW_RESULT:
        return this.updateLottoResult(prevState, data);
      case LOTTOS_ACTION.CLOSE_MODAL:
        return this.closeResultModal(prevState);
      case LOTTOS_ACTION.RESTART:
        return this.restart();
      default:
        prevState;
    }
  };

  updateLottos = (prevState, purchaseMoney) => {
    const lottos = new Array(purchaseMoney / 1000).fill([]).map(() => shuffle(LOTTO_MIN, LOTTO_MAX, 6));
    return [
      {
        ...prevState,
        lottos,
        purchaseMoney,
      },
      ["lottoTicket", "lottoWinningNumber"],
    ];
  };

  updateToggleDisplay = (prevState, checked) => {
    return [{ ...prevState, toggle: checked }, ["lottoTicket"]];
  };

  updateLottoResult = (prevState, { winningNums, bonusNum }) => {
    const { lottos, purchaseMoney } = prevState;
    let prizeMoney = 0;
    let result = { ...LOTTOS_RESULT };

    lottos.forEach((lotto) => {
      // prettier-ignore
      const _lotto = lotto.reduce((prev, num) => {
        if (winningNums.includes(num)) return { ...prev, matched: [...prev.matched, num] }
        if (bonusNum.includes(num)) return { ...prev, bonus: num }
        return prev
      }, { matched: [], bonus: 0});

      const { matched, bonus } = _lotto;
      const key = matched.length === 5 && bonus !== 0 ? "5a" : matched.length + 1 > 6 ? 6 : matched.length + 1;
      result[key][0] += 1;
    });

    for (let [_, p] of Object.entries(result)) {
      prizeMoney += p[0] * p[1];
    }

    const earningRatio = prizeMoney / Number(purchaseMoney) > 0 ? (prizeMoney / Number(purchaseMoney)) * 100 : 0;

    return [
      {
        ...prevState,
        result,
        winningNums,
        bonusNum,
        showResultModal: true,
        prizeMoney,
        earningRatio,
      },
      ["lottoResultModal"],
    ];
  };

  closeResultModal = (prevState) => {
    return [{ ...prevState, showResultModal: false, toggle: false }, ["lottoResultModal"]];
  };
  restart = () => {
    return [LOTTOS_STATE, ["lottoInput", "lottoTicket", "lottoWinningNumber", "lottoResultModal"]];
  };
}
