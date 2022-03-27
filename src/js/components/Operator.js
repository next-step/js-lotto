import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER, NUMBERS_PER_TICKET, PRICE_PER_TICKET } from '../common/constants.js';

export default class Operator {
  constructor({state, setState}) {
    this.state = state;
    this.setState = setState;
  }

  validatePrice(price) {
    const isDivisibleByThousand = price && Number(price) % PRICE_PER_TICKET === 0 ? true : false;

    if (isDivisibleByThousand) {
      this.setState({
        ...this.state,
        purchasedVal: price / PRICE_PER_TICKET,
        isConfirmBtnClicked: true
      });
    } else {
      window.alert('로또 구입 금액을 1000원 단위로 입력해주세요.');
    }
  }

  createRandomNumber() {
    return Math.floor(Math.random() * (MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER)) + 1;
  }

  makeNewNumberSets(numSetCount) {
    const randomNumbersArr = Array.from(
      {length: numSetCount},
      () => Array(NUMBERS_PER_TICKET).fill(null).map(() => this.createRandomNumber())
    )

    this.setState({
      ...this.state,
      randomNumberSet: randomNumbersArr
    })
  }

}