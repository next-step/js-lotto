import LottoInput from "./components/LottoInput/index.js";
import LottoTickets from "./components/LottoTickets/index.js";
import LottoWinningNumber from "./components/LottoWinningNumber/index.js";
import LottoResultModal from "./components/LottoResultModal/LottoResultModal.js";

import { MAX } from "./utils/constants.js";

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
      case "UPDATE_LOTTOS":
        return this.updateLottos(prevState, data);
      case "TOGGLE_LOTTO_DISPLAY":
        return this.updateToggleDisplay(prevState, data);
      case "UPDATE_LOTTO_RESULT":
        return this.updateLottoResult(prevState, data);
      case "CLOSE_MODAL":
        return this.closeResultModal(prevState);
      case "RESTART":
        return this.restart();
      default:
        prevState;
    }
  };

  updateLottos = (prevState, purchaseMoney) => {
    const totalLottos = purchaseMoney / 1000;
    const lottos = new Array(totalLottos).fill([]).map(() => {
      const lotto = new Set();
      while (lotto.size < 6) {
        lotto.add(Math.floor(Math.random() * MAX) + 1);
      }
      return [...lotto];
    });

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
    let result = {
      0: [0, 0],
      1: [0, 0],
      2: [0, 0],
      3: [0, 5000],
      4: [0, 50000],
      5: [0, 150000],
      "5a": [0, 30000000],
      6: [0, 2000000000],
    };

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
    return [
      {
        lottos: [],
        winningNums: [0, 0, 0, 0, 0, 0],
        bonusNum: 0,
        result: {
          0: [0, 0],
          1: [0, 0],
          2: [0, 0],
          3: [0, 5000],
          4: [0, 50000],
          5: [0, 150000],
          "5a": [0, 30000000],
          6: [0, 2000000000],
        },
        purchaseMoney: 0,
        toggle: false,
        showResultModal: false,
        prizeMoney: 0,
        earningRatio: 0,
      },
      ["lottoInput", "lottoTicket", "lottoWinningNumber", "lottoResultModal"],
    ];
  };
}
