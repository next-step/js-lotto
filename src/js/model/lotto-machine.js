import {
  isValidPurchasable,
  isValidNonDuplicateNumbers,
} from '../validation/index.js';
import {
  getNumberOfLottoTickets,
  getLottoNumbers,
  getWinningLottoNumberMap,
} from '../utils/index.js';
import LottoTicket from './lotto-ticket.js';
import LottoResult from './lotto-result.js';
import { LOTTO_UNIT_PRICE, RANK } from '../constant/index.js';

export default class LottoMachine {
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
    if (!isValidPurchasable(amount)) {
      throw new Error(
        `로또 구입 금액을 ${LOTTO_UNIT_PRICE.toLocaleString(
          'ko-KR'
        )}원 단위로 입력해 주세요.`
      );
    }

    const numberOfLottoTickets = getNumberOfLottoTickets(amount);

    this.#lottoTickets = this.getLottoTickets(numberOfLottoTickets);
  }

  getResult(winningNumbers, bonusNumber) {
    if (!isValidNonDuplicateNumbers(winningNumbers, bonusNumber)) {
      throw new Error('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    }

    const winningNumberMap = getWinningLottoNumberMap(
      winningNumbers,
      bonusNumber
    );

    const result = this.#lottoTickets.reduce(
      (acc, item) => {
        const rank = item.getRank(winningNumberMap);
        if (rank) {
          acc[rank] += 1;
        }
        return acc;
      },
      {
        [RANK.FIRST.KEY]: 0,
        [RANK.SECOND.KEY]: 0,
        [RANK.THIRD.KEY]: 0,
        [RANK.FOURTH.KEY]: 0,
        [RANK.FIFTH.KEY]: 0,
        [RANK.OUT.KEY]: 0,
      }
    );

    return new LottoResult(result);
  }
}
