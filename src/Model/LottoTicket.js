import { getRandomIntInRange } from '../utils';
import { NUMBER } from '../constants';

export class LottoTicket {
  #numbers = [];
  #bonusNumber;

  constructor() {
    this.#setLottoNumbers();
  }

  #getRandomLottoNumber() {
    return getRandomIntInRange(
      NUMBER.LOTTO_TICKET.MIN_RANGE,
      NUMBER.LOTTO_TICKET.MAX_RANGE
    );
  }

  #setLottoNumbers() {
    this.#numbers = this.#createMainNumber();
    this.#bonusNumber = this.#createBonusNumber();
  }

  #createMainNumber() {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size !== NUMBER.LOTTO_TICKET.NUMBERS_LENGTH) {
      const randomNumber = this.#getRandomLottoNumber();

      uniqueNumbers.add(randomNumber);
    }

    return [...uniqueNumbers];
  }

  #createBonusNumber() {
    const bonusNumber = this.#getRandomLottoNumber();

    if (this.#numbers.includes(bonusNumber)) {
      return this.#createBonusNumber();
    }

    return bonusNumber;
  }

  getTicketNumbers() {
    return { numbers: this.#numbers, bonusNumber: this.#bonusNumber };
  }
}
