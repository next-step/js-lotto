import { getRandomIntInRange } from '../utils';
import { NUMBER } from '../constants';

export class LottoTicket {
  #numbers = [];

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
    this.#numbers = this.#createNumbers();
  }

  #createNumbers() {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size !== NUMBER.LOTTO_TICKET.NUMBERS_LENGTH) {
      const randomNumber = this.#getRandomLottoNumber();

      uniqueNumbers.add(randomNumber);
    }

    return [...uniqueNumbers].sort((a, b) => a - b);
  }

  getTicketNumbers() {
    return this.#numbers;
  }
}
