import LottoInput from "./components/LottoInput/index.js";
import LottoManualInput from "./components/LottoManualInput/index.js";
import LottoManualTicketInputs from "./components/LottoManualTicketInputs/index.js";
import LottoTickets from "./components/LottoTickets/index.js";
import LottoWinningNumber from "./components/LottoWinningNumber/index.js";
import LottoResultModal from "./components/LottoResultModal/LottoResultModal.js";

import { LOTTOS_ACTION, LOTTOS_STATE, LOTTOS_RESULT, LOTTO_MIN, LOTTO_MAX, VIEW } from "./utils/constants.js";
import { cloneDeep, createRandomLotto } from "./utils/helpers.js";
import { $ } from "./utils/selectors.js";

export default class App {
  constructor(store, initialState) {
    this.state = initialState;
    this.store = store;
    this.init();
  }

  init = () => {
    this.store.registerObserver(
      {
        key: VIEW.INPUT,
        component: new LottoInput(".lotto-input", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: VIEW.MANUAL_INPUT,
        component: new LottoManualInput(".lotto-manual-input", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: VIEW.MANUAL_TICKET,
        component: new LottoManualTicketInputs(".lotto-manual-ticket", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: VIEW.TICKET,
        component: new LottoTickets(".lotto-tickets", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: VIEW.WINNING_NUMBER,
        component: new LottoWinningNumber(".lotto-win", {
          getState: this.getState,
          setState: this.setState,
        }),
      },
      {
        key: VIEW.RESULT_MODAL,
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
      case LOTTOS_ACTION.BUY_LOTTOS:
        return this.buyLottos(prevState, data);
      case LOTTOS_ACTION.BUY_MANUAL_LOTTOS:
        return this.buyManualLottos(prevState, data);
      case LOTTOS_ACTION.SET_LOTTO_MANUAL_TICKET:
        return this.setLottoManualTicketInputs(prevState, data);
      case LOTTOS_ACTION.TOGGLE_LOTTO_DISPLAY:
        return this.toggleLottoDispaly(prevState, data);
      case LOTTOS_ACTION.SHOW_LOTTO_RESULT:
        return this.updateLottoResult(prevState, data);
      case LOTTOS_ACTION.CLOSE_MODAL:
        return this.closeResultModal(prevState);
      case LOTTOS_ACTION.RESTART:
        return this.restart();
      default:
        prevState;
    }
  };

  buyLottos = (prevState, purchaseMoney) => {
    const lottos = new Array(purchaseMoney / 1000).fill([]).map(() => createRandomLotto(LOTTO_MIN, LOTTO_MAX, 6));
    return [
      {
        ...prevState,
        lottos,
        purchaseMoney,
      },
      [VIEW.INPUT, VIEW.MANUAL_INPUT, VIEW.TICKET, VIEW.WINNING_NUMBER],
    ];
  };

  getManualLottos = (lottoNums) => {
    const lottos = [];
    let temp = [];
    for (let i = 0; i < lottoNums.length; i++) {
      temp.push(lottoNums[i]);
      if (temp.length === 6) {
        lottos.push(temp);
        temp = [];
      }
    }
    return lottos;
  };

  buyManualLottos = (prevState, lottoNums) => {
    const { manualTicket } = prevState;
    const purchaseMoney = Number($(".input-purchase").value);
    const randomLottos = new Array(purchaseMoney / 1000 - manualTicket)
      .fill([])
      .map(() => createRandomLotto(LOTTO_MIN, LOTTO_MAX, 3));
    return [
      {
        ...prevState,
        purchaseMoney: purchaseMoney,
        showManualTicketInputs: false,
        lottos: [...this.getManualLottos(lottoNums), ...randomLottos],
      },
      [VIEW.INPUT, VIEW.MANUAL_INPUT, VIEW.MANUAL_TICKET, VIEW.TICKET, VIEW.WINNING_NUMBER],
    ];
  };

  setLottoManualTicketInputs = (prevState, manualTicket) => {
    return [{ ...prevState, manualTicket, showManualTicketInputs: true }, [VIEW.MANUAL_TICKET]];
  };

  toggleLottoDispaly = (prevState, checked) => {
    return [{ ...prevState, toggle: checked }, [VIEW.TICKET]];
  };

  updateLottoResult = (prevState, { winningNums, bonusNum }) => {
    const { lottos, purchaseMoney } = prevState;
    const result = this.getResult(cloneDeep(LOTTOS_RESULT), lottos, winningNums, bonusNum);
    const prizeMoney = this.getPrizeMoney(result);
    return [
      {
        ...prevState,
        result,
        winningNums,
        bonusNum,
        showResultModal: true,
        prizeMoney,
        earningRatio: this.getEarningRatio(prizeMoney, purchaseMoney),
      },
      [VIEW.RESULT_MODAL],
    ];
  };

  closeResultModal = (prevState) => {
    return [{ ...prevState, showResultModal: false, toggle: false }, [VIEW.RESULT_MODAL]];
  };

  restart = () => {
    return [LOTTOS_STATE, [VIEW.INPUT, VIEW.MANUAL_INPUT, VIEW.TICKET, VIEW.WINNING_NUMBER, VIEW.RESULT_MODAL]];
  };

  getPrizeMoney = (lottoResult) => {
    let prizeMoney = 0;
    for (const [_, p] of Object.entries(lottoResult)) {
      const winCount = p[0];
      const winPrize = p[1];
      prizeMoney += winCount * winPrize;
    }
    return prizeMoney;
  };

  getEarningRatio = (prize, purchase) => (prize / Number(purchase) > 0 ? (prize / Number(purchase)) * 100 : 0);

  getResult = (lottoResult, lottos, winningNums, bonusNum) => {
    lottos.forEach((lotto) => {
      const _lotto = lotto.reduce(
        (prev, num) => {
          if (winningNums.includes(num)) {
            return { ...prev, matched: [...prev.matched, num] };
          }
          if (bonusNum.includes(num)) {
            return { ...prev, bonus: num };
          }
          return prev;
        },
        { matched: [], bonus: 0 }
      );

      const { matched, bonus } = _lotto;
      //prettier-ignore

      const key = matched.length === 5 && bonus !== 0 ? "5a" 
                                                      : matched.length
      lottoResult[key][0] += 1;
    });
    return lottoResult;
  };
}
