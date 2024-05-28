import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

const LottoMachine = {
  generateRandomLotto() {
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

    const lotto = new Lotto(
      shuffle(LottoNumber.LOTTO_NUMBERS).slice(0, Lotto.LENGTH_LOTTO_NUMBERS)
    );

    return lotto;
  },

  generateRandomLottos(lottosCount) {
    const lottos = [];
    for (let i = 0; i < lottosCount; i++) {
      const lotto = this.generateRandomLotto();
      lottos.push(lotto);
    }

    return lottos;
  },
};

export default LottoMachine;
