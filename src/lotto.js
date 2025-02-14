export default class Lotto {
  constructor(paymentAmount) {
    this.count = Math.floor(paymentAmount / 1000);
    this.numbers = [];
  }

  make() {}
}
