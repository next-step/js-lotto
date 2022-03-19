class LottoQuantityView {
  constructor({ $target, quantity }) {
    this.$target = $target;
    this.quantity = quantity;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
  }

  template() {
    return `<label class="flex-auto my-0">총 ${this.quantity}개를 구매하였습니다.</label>`;
  }
}

export default LottoQuantityView;
