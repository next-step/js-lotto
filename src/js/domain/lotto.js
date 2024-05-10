import { LOTTO } from "../../constants/lotto";
import { generateRandomNumber } from "../../utils/generateRandomNumber";

export class Lotto {
  constructor() {}

  getLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < LOTTO.NUMBERS_COUNT) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MAX_NUMBER));
    }

    return Array.from(lottoNumbers).sort((a, b) => a - b);
  }
}
