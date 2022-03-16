export default class User {
  constructor() {
    this.wallet = 0;
  }

  buyLotto(seller, machine) {
    const count = seller.calculateLotto(this.wallet);
    return seller.sellLotto(machine, count);
  }
}
