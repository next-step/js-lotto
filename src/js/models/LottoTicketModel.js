import { LOTTO_LENGTH, LOTTO_NUMBER_RANGE_MAX, LOTTO_NUMBER_RANGE_MIN } from '../constants.js';
import { isAlreadyExist } from '../validators.js';

export default class LottoTicketModel {
  winningNumbers = []; // number[];
  constructor(originLottos) {
    this.generate(originLottos);
  }

  generate(originLottos) {
    let hasSameLotto = true;
    let newLottoNumbers = this.generateLottoNumbers();
    while (hasSameLotto) {
      if (!isAlreadyExist(originLottos.concat([newLottoNumbers]))) {
        hasSameLotto = false;
      } else {
        newLottoNumbers = this.generateLottoNumbers();
      }
    }
    this.winningNumbers = newLottoNumbers;
  }

  generateLottoNumbers = () => {
    const lottoNumbers = Array.from({ length: LOTTO_NUMBER_RANGE_MAX }).map(
      (_, i) => i + LOTTO_NUMBER_RANGE_MIN
    );
    // 아래와 같이도 사용이 가능함.
    // const lottoNumbers = Array(LOTTO_NUMBER_RANGE_MAX)
    //   .fill(LOTTO_NUMBER_RANGE_MIN)
    //   .map((min, index) => min + index);

    return lottoNumbers
      .sort(() => Math.random() - 0.5)
      .slice(0, LOTTO_LENGTH)
      .sort((a, b) => a - b);
  };
}
