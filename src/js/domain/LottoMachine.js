import Lotto from "./Lotto";
import LottoNumber from "./LottoNumber";

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

    new Lotto(lottoNumbers);
  },
};

export default LottoMachine;
