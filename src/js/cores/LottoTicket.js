import { MIN_NUMBER, MAX_NUMBER } from '../constants';

export class LottoTicket {
  numbers;

  constructor() {}

  randomNumbers() {
    const number = Math.trunc(
      Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
    );
  }
}
