import {
  isValidPurchasable,
  isValidNonDuplicateNumbers,
} from '../validation/index.js';
import { getNumberOfLottoTickets, getLottoNumbers } from '../utils/index.js';
import LottoTicket from './lotto-ticket.js';
import LottoResult from './lotto-result.js';

export default class LottoMachine {
  #unitPrice = 1_000;

  #lottoTickets = [];

  get lottoTickets() {
    return this.#lottoTickets;
  }

  isPurchasedLottoTickets() {
    return this.#lottoTickets.length > 0;
  }

  getLottoTickets = (numberOfLottoTickets) =>
    Array(numberOfLottoTickets)
      .fill(undefined)
      .map(() => {
        const numbers = getLottoNumbers();
        return new LottoTicket(numbers);
      });

  generateLottoTicketByAutomatic(amount) {
    if (!isValidPurchasable(amount, this.#unitPrice)) {
      throw new Error(
        `로또 구입 금액을 ${this.#unitPrice.toLocaleString(
          'ko-KR'
        )}원 단위로 입력해 주세요.`
      );
    }

    const numberOfLottoTickets = getNumberOfLottoTickets(
      amount,
      this.#unitPrice
    );

    this.#lottoTickets = this.getLottoTickets(numberOfLottoTickets);
  }

  getResult = (winningNumbers, bonusNumber) => {
    if (!isValidNonDuplicateNumbers(winningNumbers, bonusNumber)) {
      throw new Error('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    }
    return new LottoResult();
  };
}
