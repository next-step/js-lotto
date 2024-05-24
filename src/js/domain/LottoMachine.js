import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

const LottoMachine = {
  generateRandomLotto() {
    const lottoNumbers = [];
    const candidateLottoNumbers = Array.from(
      { length: LottoNumber.MAX_LOTTO_NUMBER },
      (_, i) => i + 1
    );

    for (let i = 0; i < Lotto.LENGTH_LOTTO_NUMBERS; i++) {
      const randomIndex = Math.floor(
        Math.random() * candidateLottoNumbers.length
      );

      const deletedNumbers = candidateLottoNumbers.splice(randomIndex, 1);
      lottoNumbers.push(...deletedNumbers);
    }

    return new Lotto(lottoNumbers);
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
