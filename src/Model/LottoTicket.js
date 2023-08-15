import { getRandomIntInRange } from '../utils';

export class LottoTicket {
  #numbers = [];
  #bonusNumber;

  constructor() {
    this.#setLottoNumbers();
  }

  #getRandomLottoNumber() {
    return getRandomIntInRange(1, 43);
  }

  #setLottoNumbers() {
    this.#numbers = this.#createMainNumber();
    this.#bonusNumber = this.#createBonusNumber();
  }

  #createMainNumber() {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size !== 6) {
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
