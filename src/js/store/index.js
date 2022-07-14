import { makeLotto } from '../utils/lotto.js';
import reactive from '../utils/reactive.js';

const state = reactive({
  amount: null,
  lottoList: [],
  isVisibleLottos: false,
});

const getter = {
  getLottoAmount() {
    return Math.floor(state.amount / 1000);
  },
};

const mutation = {
  setAmount(payload) {
    state.amount = payload;
  },
  setLottoList(payload) {
    state.lottoList = payload;
  },
  setIsVisibleLottos(payload) {
    state.isVisibleLottos = payload;
  },
};

const action = {
  makeLottoList() {
    const lottoAmount = getter.getLottoAmount();
    const lottoList = new Array(lottoAmount).fill(null).map(() => makeLotto());
    mutation.setLottoList(lottoList);
  },
};

export default { mutation, state: Object.freeze(state), action, getter };
