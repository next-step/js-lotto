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
    return `<label class="flex-auto my-0">총 <span id="quantity-text">${this.quantity}</span>개를 구매하였습니다.</label> <div class="flex-auto d-flex justify-end pr-1">
    <label class="switch">
      <input type="checkbox" class="lotto-numbers-toggle-button" />
      <span class="text-base font-normal">번호보기</span>
    </label>
    </div>`;
  }
}

export default LottoQuantityView;
