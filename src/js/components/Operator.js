export default class Operator {
  constructor({state, setState}) {
    this.state = state;
    this.setState = setState;
  }

  validatePrice(price) {
    const isDivisibleByThousand = price && Number(price) % 1000 === 0 ? true : false;
    if (isDivisibleByThousand) {
      this.setState({
        ...this.state,
        purchasedVal: price / 1000,
        isConfirmBtnClicked: true
      });
    } else {
      window.alert('로또 구입 금액을 1000원 단위로 입력해주세요.');
    }
  }

}