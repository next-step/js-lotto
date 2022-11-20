import { generateLottoNumbers } from '../generateLottos.js';
import { isAlreadyExist } from '../validators.js';

export default class LottoTicketModel {
  constructor() {
    this.winningNumbers = []; // number[];
  }

  generate(originLottos) {
    let hasSameLotto = true;
    let newLottoNumbers = generateLottoNumbers();
    while (hasSameLotto) {
      if (!isAlreadyExist(originLottos.concat([newLottoNumbers]))) {
        hasSameLotto = false;
      } else {
        newLottoNumbers = generateLottoNumbers();
      }
    }
    this.winningNumbers = newLottoNumbers;
  }
}
